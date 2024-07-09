'use client'
import { useDeleteRequstProductMutation } from "@/app/redux/features/inventoryProduct";
import { setSingleProductRequst } from "@/app/redux/slices/inventorySlice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { TbCircleDashed } from "react-icons/tb";
import moment from 'moment';

const ButtonStyles = {
  Approved: {
    backgroundColor: "#DFFFDA",
    color: "#219F0C",
  },
  Pending: {
    backgroundColor: "#FFE4D5",
    color: "#FC5C02",
  },
  Rejected: {
    backgroundColor: "#FFE4F0",
    color: "#FF1E7C",
  },
};

const ListDataTable = ({requestData}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  
  const editHandler = (product) => {
    dispatch(setSingleProductRequst(product))
    setTimeout(() => router.push(`/inventory/product-request-form/${product?.id}`),500)
  }
 
  const token = localStorage.getItem('vendorToken')
  const [deleteReqProduct, {}] = useDeleteRequstProductMutation();
  const [deleteId, setDeleteId] = useState('')

  const reqProductDeleteHandler = async (prod_id) => {
    setDeleteId(prod_id)
    const delete_res = await deleteReqProduct({prod_id, token})

    if(delete_res?.data?.message == "Request success"){
      setDeleteId('')
      toast.success("Product Deleted Successfully", {
        position: "top-right",
        duration: 2000,
      });
    }
    else{
      setDeleteId('')
      toast.error("Product Deleted Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
    
    console.log('delete response ===>', delete_res)
  }
  

  return (
    <Table className="max-w-[1412px] mt-10 mb-20">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          {/* <TableHead>Stock</TableHead> */}
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {requestData?.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product._id}
          >
            <TableCell className="font-medium">
              <Checkbox className="w-4 h-4 border border-black rounded-md" />
            </TableCell>
            <TableCell className="font-medium ">
              {product?.product_name}
            </TableCell>
            <TableCell>{product?.category_name}</TableCell>
            {/* <TableCell>{product?.stock ? product?.stock : ''}</TableCell> */}
            <TableCell>{product?.product_rate ? product?.product_rate : ''}</TableCell>
            <TableCell className="text-center">
              <button
                style={ButtonStyles[product.status]}
                className="h-[47px] w-[129px] rounded-xl"
              >
                {product.status}
              </button>
            </TableCell>
            <TableCell>
            <p>{product?.request_time ? moment(product?.request_time).format('DD/MM/YYYY; hh:mm A') : ''}</p>
            </TableCell>

            <TableCell className=" text-end">
              <div className="flex items-center justify-start gap-2">
              {
                  deleteId == product?.id ? <TbCircleDashed
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                /> :
                <RiDeleteBin5Fill
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                  onClick={() => reqProductDeleteHandler(product?.id)}
                />
                }
                <MdModeEditOutline
                  onClick={() => editHandler(product)}
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                />
                <IoEye className="cursor-pointer" size={20} color="#7B7C80" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListDataTable;
