import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEye } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ProductList = [
  {
    _id: 1,
    product_name: "RIG-BS-6025RF Research Upright Metallurgical Microscope",
    category: "Auto Parts",
    stock: 479,
    price: 579,
    status: "Approved",
  },
  {
    _id: 2,
    product_name: "Acer Predator Helios 300 Gaming Laptop",
    category: "Electronics",
    stock: 120,
    price: 1200,
    status: "Approved",
  },
  {
    _id: 3,
    product_name: "Bosch 12V Max Cordless Drill Set",
    category: "Tools",
    stock: 75,
    price: 149,
    status: "Rejected",
  },
  {
    _id: 4,
    product_name: "Yamaha YTR-2330 Standard Bb Trumpet",
    category: "Musical Instruments",
    stock: 0,
    price: 899,
    status: "Approved",
  },
  {
    _id: 5,
    product_name: "Samsung Galaxy S21 Ultra",
    category: "Electronics",
    stock: 30,
    price: 999,
    status: "Pending",
  },
  {
    _id: 6,
    product_name: "Nike Air Zoom Pegasus 37",
    category: "Footwear",
    stock: 250,
    price: 120,
    status: "Approved",
  },
  {
    _id: 7,
    product_name: "Sony WH-1000XM4 Wireless Headphones",
    category: "Electronics",
    stock: 90,
    price: 350,
    status: "Rejected",
  },
  {
    _id: 8,
    product_name: "DeWalt 20V MAX Cordless Impact Wrench",
    category: "Tools",
    stock: 65,
    price: 229,
    status: "Pending",
  },
  {
    _id: 9,
    product_name: "Adidas Ultraboost 21 Running Shoes",
    category: "Footwear",
    stock: 0,
    price: 180,
    status: "Pending",
  },
  {
    _id: 10,
    product_name: "Canon EOS R5 Mirrorless Camera",
    category: "Photography",
    stock: 15,
    price: 3899,
    status: "Rejected",
  },
  {
    _id: 11,
    product_name: "Apple MacBook Pro 16-inch",
    category: "Electronics",
    stock: 45,
    price: 2499,
    status: "Approved",
  },
];

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
  return (
    <Table className="max-w-[1412px] mt-10 mb-20">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
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
            <TableCell>{product?.sub_cat}</TableCell>
            <TableCell>{product?.stock ? product?.stock : ''}</TableCell>
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
              <p>5/19/2024; 03:54 PM</p>
            </TableCell>

            <TableCell className=" text-end">
              <div className="flex items-center justify-start gap-2">
                <RiDeleteBin5Fill
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                />
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

export default ListDataTable;
