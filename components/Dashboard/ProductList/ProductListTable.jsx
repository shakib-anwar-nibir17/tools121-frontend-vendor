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
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbCircleDashed } from "react-icons/tb";

const ProductList = [
  {
    _id: 1,
    product_name: "RIG-BS-6025RF Research Upright Metallurgical Microscope",
    category: "Auto Parts",
    stock: 479,
    price: 579,
    status: "Published",
  },
  {
    _id: 2,
    product_name: "Acer Predator Helios 300 Gaming Laptop",
    category: "Electronics",
    stock: 120,
    price: 1200,
    status: "Published",
  },
  {
    _id: 3,
    product_name: "Bosch 12V Max Cordless Drill Set",
    category: "Tools",
    stock: 75,
    price: 149,
    status: "Limited Stock",
  },
  {
    _id: 4,
    product_name: "Yamaha YTR-2330 Standard Bb Trumpet",
    category: "Musical Instruments",
    stock: 0,
    price: 899,
    status: "Out of stock",
  },
  {
    _id: 5,
    product_name: "Samsung Galaxy S21 Ultra",
    category: "Electronics",
    stock: 30,
    price: 999,
    status: "Low Stock",
  },
  {
    _id: 6,
    product_name: "Nike Air Zoom Pegasus 37",
    category: "Footwear",
    stock: 250,
    price: 120,
    status: "Published",
  },
  {
    _id: 7,
    product_name: "Sony WH-1000XM4 Wireless Headphones",
    category: "Electronics",
    stock: 90,
    price: 350,
    status: "Limited Stock",
  },
  {
    _id: 8,
    product_name: "DeWalt 20V MAX Cordless Impact Wrench",
    category: "Tools",
    stock: 65,
    price: 229,
    status: "Low Stock",
  },
  {
    _id: 9,
    product_name: "Adidas Ultraboost 21 Running Shoes",
    category: "Footwear",
    stock: 0,
    price: 180,
    status: "Out of stock",
  },
  {
    _id: 10,
    product_name: "Canon EOS R5 Mirrorless Camera",
    category: "Photography",
    stock: 15,
    price: 3899,
    status: "Low Stock",
  },
  {
    _id: 11,
    product_name: "Apple MacBook Pro 16-inch",
    category: "Electronics",
    stock: 45,
    price: 2499,
    status: "Published",
  },
];

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
          <TableHead>Status</TableHead>
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
            <TableCell className="w-[19%]">
              <button
                style={ButtonStyles[product?.status]}
                className="h-[47px] w-[129px] rounded-xl"
              >
                {product?.status}
              </button>
            </TableCell>
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
