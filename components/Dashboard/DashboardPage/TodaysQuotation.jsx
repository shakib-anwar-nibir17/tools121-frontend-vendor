import CustomSelect from "@/components/common/CustomSelect";
import PaginationComponent from "@/components/common/Pagination";
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
    product_quantity: 479,
    request_note:
      "Hello, Please send these products within 15 days. We need these urgently.",
    customer_name: "Bryane Crape",
  },
  {
    _id: 2,
    product_name: "Leica DM750 M Microscope",
    product_quantity: 150,
    request_note: "Need these microscopes by the end of the month. Thank you.",
    customer_name: "Janet Downey",
  },
  {
    _id: 3,
    product_name: "Nikon Eclipse MA200 Inverted Microscope",
    product_quantity: 325,
    request_note: "Please expedite the delivery, we are on a tight schedule.",
    customer_name: "Samuel Harrington",
  },
  {
    _id: 4,
    product_name: "Olympus GX51 Inverted Metallurgical Microscope",
    product_quantity: 50,
    request_note:
      "Require these for the new lab setup. Deliver within 20 days.",
    customer_name: "Rebecca Smith",
  },
  {
    _id: 5,
    product_name: "Zeiss Axio Lab.A1 Microscope",
    product_quantity: 230,
    request_note: "Kindly prioritize this order as we need these urgently.",
    customer_name: "George Tanaka",
  },
  {
    _id: 6,
    product_name: "Mitutoyo MF-B2017 Measuring Microscope",
    product_quantity: 110,
    request_note: "Please ensure delivery by next week. It's very important.",
    customer_name: "Christine Lee",
  },
  {
    _id: 7,
    product_name: "Keyence VHX-7000 Digital Microscope",
    product_quantity: 75,
    request_note: "Need these products in two weeks for a critical project.",
    customer_name: "Michael Johnson",
  },
  {
    _id: 8,
    product_name: "AmScope T340B-LED Compound Trinocular Microscope",
    product_quantity: 200,
    request_note: "We have a major exhibition coming up. Please send ASAP.",
    customer_name: "Emily Carter",
  },
  {
    _id: 9,
    product_name: "Fisherbrand Micromaster Compound Microscope",
    product_quantity: 90,
    request_note: "Urgent requirement for educational purposes. Deliver soon.",
    customer_name: "David Kim",
  },
  {
    _id: 10,
    product_name: "Swift SW380T Biological Microscope",
    product_quantity: 130,
    request_note: "Please process this order quickly. We are in urgent need.",
    customer_name: "Laura Williams",
  },
];

const TodaysQuotation = () => {
  return (
    <div className="max-w-[1189px] mt-10">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium border-b-[3px] py-3 border-primary-900 px-4">
          <h1 className="text-black">
            Today’s Quotations <span className="text-primary-900">(15)</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-black">Show</p>
          <CustomSelect />
          <PaginationComponent />
        </div>
      </div>
      <Table className="mt-6 mb-20">
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
            <TableHead>Action</TableHead>
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
              <TableCell className="font-medium">
                {product.product_name}
              </TableCell>
              <TableCell className="text-center text-gray-500">
                {product.product_quantity} pieces
              </TableCell>
              <TableCell className="">{product.request_note}</TableCell>
              <TableCell className=" text-gray-500">
                {product.customer_name}
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center gap-2">
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
    </div>
  );
};

export default TodaysQuotation;
