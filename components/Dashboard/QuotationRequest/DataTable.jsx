import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp } from "@/utils/utils";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const DataTable = ({ data }) => {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>
            <Checkbox
              id="terms"
              className="w-4 h-4 border border-black rounded-md"
            />
          </TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Product Quantity</TableHead>
          <TableHead className="w-[40%]">Request Note</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead></TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {data?.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product.id}
          >
            <TableCell className="font-medium w-[3%]">
              <Checkbox className="w-4 h-4 border border-black rounded-md" />
            </TableCell>
            <TableCell
              className={`${
                product.status === "unread" ? "text-primary-900" : "text-black"
              } font-medium w-[17.5%]`}
            >
              <Link href={`/quotation-request/all-request/${product._id}`}>
                {product?.product_name}
              </Link>
            </TableCell>
            <TableCell className=" text-gray-500 w-[13%]">
              {product?.product_quantity} pieces
            </TableCell>
            <TableCell className="w-[25%] text-justify">
              {product?.request_note?.slice(0, 250)}
            </TableCell>
            <TableCell className=" text-gray-500 w-[10%]">
              {product?.customer_name}
            </TableCell>
            <TableCell>
              <button className="text-[#FF1E7C] w-[3%]">spam</button>
            </TableCell>
            <TableCell className=" text-black font-bold w-[22%]">
              {formatTimestamp(product?.created)}
            </TableCell>
            <TableCell className="">
              <div className="flex items-center justify-center gap-2">
                <IoEye className="cursor-pointer" size={20} color="#7B7C80" />

                <MdModeEditOutline
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                />
                <RiDeleteBin5Fill
                  className="cursor-pointer"
                  size={20}
                  color="#7B7C80"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
