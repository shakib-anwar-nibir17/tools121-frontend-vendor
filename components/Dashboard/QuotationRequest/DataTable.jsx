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
import { RiDeleteBin5Fill, RiPushpinFill } from "react-icons/ri";

const DataTable = ({ tableData, quotationActionSubmit , from,
   setReplyId, replyId, repleyHandler, setReplyText}) => {
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
          <TableHead className="w-[30%]">Request Note</TableHead>
          <TableHead>Customer Name</TableHead>
         {from == 'quotation' &&  <TableHead></TableHead>}
          <TableHead>Date & Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {tableData?.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product.id}
          >
            <TableCell className="font-medium w-[3%]">
              <Checkbox className="w-4 h-4 border border-black rounded-md" />
            </TableCell>
            <TableCell
              className={`${
                product?.supplier_action_type == 0
                  ? "text-primary-900 font-bold"
                  : "text-black font-medium "
              } w-[17.5%]`}
            >
              <Link  href={`/quotation-request/all-request/${product?.id}`}>
                {product?.product_name}
              </Link>
            </TableCell>
            <TableCell className=" text-gray-500 w-[10%]">
              {product?.product_quantity} pieces
            </TableCell>
            <TableCell className="w-[20%] text-justify">
              {product?.request_note ? `${product?.request_note?.slice(0, 120) + "....."}` : ''}
            </TableCell>
            <TableCell className=" text-gray-500 ">
              {product?.customer_name}
            </TableCell>
            {
              from == 'quotation' && <TableCell>
              {product?.supplier_action_type == 400 ? (
                ""
              ) : (
                <button
                  onClick={() => quotationActionSubmit(400, product?.q_read_id)}
                  className="text-[#FF1E7C] w-[3%]"
                >
                  spam
                </button>
              )}
            </TableCell>
            }
            <TableCell className=" text-black font-bold w-[22%]">
              {formatTimestamp(product?.quote_time)}
            </TableCell>
            {
              from == 'universal' ?  <TableCell className="w-[35%] text-center">
               {
                replyId == product.id ?  <>
                <textarea
                type="text"
                className="w-full h-full border border-1 border-gray-400 px-2 focus:outline-none text-sm"
                placeholder="write reply"
                onChange={(e) => {
                  setReplyText(e.target.value)
                }}
              />
               <div className="flex flex-row ">
               <button
                  onClick={() => setReplyId()}
                  className="text-gray-600 w-[3%]"
                >
                  Cancel
                </button> 
                <button
                  onClick={() => repleyHandler()}
                  className="text-white  ms-14 p-2 rounded-md bg-blue-700"
                >
                  Send
                </button> 
               </div>
                </>  :  <button
                  onClick={() => setReplyId(product.id)}
                  className="text-green-600 w-[3%] "
                >
                  Reply
                </button> 
               }
            </TableCell>
            :
            <TableCell className="">
            <div className="flex items-center justify-center gap-2">
              <Link href={`/quotation-request/all-request/${product.id}`}>
                <IoEye className="cursor-pointer" size={20} color="#7B7C80" />
              </Link>

              <RiPushpinFill
                className="cursor-pointer"
                size={20}
                color={
                  product?.supplier_action_type == 200 ? "blue" : "#7B7C80"
                }
                onClick={() => {
                  if (product?.supplier_action_type !== 200) {
                    quotationActionSubmit(200, product.q_read_id);
                  }
                  else if(product?.supplier_action_type == 200) {
                    quotationActionSubmit(100, product.q_read_id);
                  }
                }}
              />

              <RiDeleteBin5Fill
                className="cursor-pointer"
                size={20}
                color="#7B7C80"
                onClick={() => quotationActionSubmit(300, product.q_read_id)}
              />
            </div>
          </TableCell>
            }
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
