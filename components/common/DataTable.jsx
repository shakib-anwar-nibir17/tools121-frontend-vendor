import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
const ProductList = [
  {
    _id: 1,
    product_name: "RIG-BS-6025RF Research Upright Metallurgical Microscope",
    product_quantity: 479,
    request_note:
      "Hello, Please send these products within 15 days. We need these urgently.",
    customer_name: "Bryane Crape",
    date: "5/19/2024;  03:54 PM",
    status: "unread",
  },
  {
    _id: 2,
    product_name: "Digital Multimeter",
    product_quantity: 120,
    request_note:
      "We require these for our electrical testing lab. Please ensure they are of good quality.",
    customer_name: "John Doe",
    date: "5/20/2024;  10:23 AM",
    status: "unread",
  },
  {
    _id: 3,
    product_name: "Laboratory Glassware Set",
    product_quantity: 300,
    request_note:
      "Our current glassware has worn out. Kindly send replacements at the earliest.",
    customer_name: "Alice Smith",
    date: "5/21/2024;  01:45 PM",
    status: "unread",
  },
  {
    _id: 4,
    product_name: "Precision Weighing Scale",
    product_quantity: 50,
    request_note:
      "We need this for our research project. Please expedite the delivery if possible.",
    customer_name: "David Johnson",
    date: "5/22/2024;  09:12 AM",
    status: "read",
  },
  {
    _id: 5,
    product_name: "Chemical Reagents Kit",
    product_quantity: 200,
    request_note:
      "These reagents are essential for our ongoing experiments. Requesting immediate dispatch.",
    customer_name: "Emily Brown",
    date: "5/23/2024;  02:30 PM",
    status: "read",
  },
  {
    _id: 6,
    product_name: "Industrial Safety Gloves",
    product_quantity: 150,
    request_note:
      "Our lab personnel need new safety gloves. Please include them in our next shipment.",
    customer_name: "Michael Clark",
    date: "5/24/2024;  11:05 AM",
    status: "read",
  },
  {
    _id: 7,
    product_name: "Bunsen Burner",
    product_quantity: 30,
    request_note:
      "We require additional Bunsen burners for our chemistry lab. Urgent delivery needed.",
    customer_name: "Sophia Rodriguez",
    date: "5/25/2024;  04:20 PM",
    status: "read",
  },
  {
    _id: 8,
    product_name: "Dissecting Kit",
    product_quantity: 40,
    request_note:
      "We need these kits for our biology practical sessions. Please prioritize the shipment.",
    customer_name: "Matthew Wilson",
    date: "5/26/2024;  08:55 AM",
    status: "read",
  },
  {
    _id: 9,
    product_name: "pH Meter",
    product_quantity: 15,
    request_note:
      "Our current pH meter is malfunctioning. Need a replacement urgently.",
    customer_name: "Olivia Taylor",
    date: "5/27/2024;  01:10 PM",
    status: "read",
  },
  {
    _id: 10,
    product_name: "Microcentrifuge",
    product_quantity: 5,
    request_note:
      "This equipment is crucial for our DNA extraction experiments. Requesting immediate delivery.",
    customer_name: "Daniel Martinez",
    date: "5/28/2024;  10:40 AM",
    status: "read",
  },
];

const DataTable = () => {
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
          <TableHead className="text-center">Product Quantity</TableHead>
          <TableHead>Request Note</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {ProductList.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product._id}
          >
            <TableCell className="font-medium">
              <Checkbox className="w-4 h-4 border border-black rounded-md" />
            </TableCell>
            <TableCell
              className={`${
                product.status === "unread" ? "text-primary-900" : "text-black"
              } font-medium`}
            >
              <Link href={`/quotation-request/all-request/${product._id}`}>
                {product.product_name}
              </Link>
            </TableCell>
            <TableCell className="text-center text-gray-500">
              {product.product_quantity} pieces
            </TableCell>
            <TableCell className="">{product.request_note}</TableCell>
            <TableCell className=" text-gray-500">
              {product.customer_name}
            </TableCell>
            <TableCell className=" text-gray-500">{product.date}</TableCell>
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
