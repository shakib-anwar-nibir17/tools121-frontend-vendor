import { DeleteSVG } from "@/components/icons/Icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

const NewOrder = () => {
  return (
    <Table className="max-w-[1189px] mt-10 mb-20">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>New Price</TableHead>
          <TableHead>QTY</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        <TableRow className="text-black border-b-2 border-slate-200">
          <TableCell className="font-medium">
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <Image
                src={"/item-pic4.png"}
                width={44}
                height={44}
                alt="product_pic"
              />
              <div>
                <h1 className="text-sm font-medium">
                  Portable Multi gas detector RKI GX-2009
                </h1>
                <p className="text-primary-600 text-[12px]">#302406</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Meter</TableCell>
          <TableCell>10</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>10%</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <FaPlus /> 1 <FiMinus />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Checkbox className="w-4 h-4 border border-black rounded-sm" />
              <DeleteSVG />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="text-black border-b-2 border-slate-200">
          <TableCell className="font-medium">
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <Image
                src={"/item-pic4.png"}
                width={44}
                height={44}
                alt="product_pic"
              />
              <div>
                <h1 className="text-sm font-medium">
                  Portable Multi gas detector RKI GX-2009
                </h1>
                <p className="text-primary-600 text-[12px]">#302406</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Meter</TableCell>
          <TableCell>10</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>10%</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <FaPlus /> 1 <FiMinus />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Checkbox className="w-4 h-4 border border-black rounded-sm" />
              <DeleteSVG />
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="text-black border-b-2 border-slate-200">
          <TableCell className="font-medium">
            <Checkbox className="w-4 h-4 border border-black rounded-md" />
          </TableCell>
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <Image
                src={"/item-pic4.png"}
                width={44}
                height={44}
                alt="product_pic"
              />
              <div>
                <h1 className="text-sm font-medium">
                  Portable Multi gas detector RKI GX-2009
                </h1>
                <p className="text-primary-600 text-[12px]">#302406</p>
              </div>
            </div>
          </TableCell>
          <TableCell>Meter</TableCell>
          <TableCell>10</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>10%</TableCell>
          <TableCell>$590.00</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <FaPlus /> 1 <FiMinus />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Checkbox className="w-4 h-4 border border-black rounded-sm" />
              <DeleteSVG />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default NewOrder;
