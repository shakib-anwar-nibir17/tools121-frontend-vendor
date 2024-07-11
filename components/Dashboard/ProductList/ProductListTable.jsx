'use clien'
import { useDeleteProductMutation } from "@/app/redux/features/inventoryProduct";
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
import { TbCircleDashed } from "react-icons/tb";

const ButtonStyles = {
  Published: {
    backgroundColor: "#DFFFDA",
    color: "#219F0C",
  },
  "Limited Stock": {
    backgroundColor: "#FFE4D5",
    color: "#FC5C02",
  },
  "Low Stock": {
    backgroundColor: "#FFE4F0",
    color: "#FF1E7C",
  },
  "Out of stock": {
    backgroundColor: "#FFE8E8",
    color: "#FF1E1E",
  },
};

const ProductListTable = ({productData}) => {
  const token = localStorage.getItem('vendorToken')
  const [deleteProduct, {}] = useDeleteProductMutation();
  const [deleteId, setDeleteId] = useState('')
  const router = useRouter()

  const productDeleteHandler = async (prod_id) => {
    setDeleteId(prod_id)
    const delete_res = await deleteProduct({prod_id, token})

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

  const editHandler = (id) => {
    console.log('id -->', id)
    router.push(`/inventory/product-list/${id}`)
  }

  return (
    <Table className="max-w-[1189px] mt-10 mb-20">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          {/* <TableHead>Status</TableHead> */}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {productData?.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product?.id}
          >
            <TableCell className="font-medium">
              <Checkbox className="w-4 h-4 border border-black rounded-md" />
            </TableCell>
            <TableCell className="font-medium w-[27%]">
              {product.product_name}
            </TableCell>
            <TableCell className="w-[10%]">{product?.category ? product?.category : '-'}</TableCell>
            <TableCell className="w-[12.5%]">{product?.stock ? product?.stock : '-'}</TableCell>
            <TableCell className="w-[12.5%]">{product?.new_price ? product?.new_price : '-'}</TableCell>
            {/* <TableCell className="w-[19%]">
              <button
                style={ButtonStyles[product?.status]}
                className="h-[47px] w-[129px] rounded-xl"
              >
                {product?.status}
              </button>
            </TableCell> */}
            <TableCell className="w-[12.5%]">
              <div className="flex items-center justify-center gap-2">
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
                  onClick={() => productDeleteHandler(product?.id)}
                />
                }
                <MdModeEditOutline
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                  onClick={() => editHandler(product?.id)}
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

export default ProductListTable;
