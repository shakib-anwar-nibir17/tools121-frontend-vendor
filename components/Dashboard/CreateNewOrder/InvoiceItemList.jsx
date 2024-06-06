import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { SlPrinter } from "react-icons/sl";
import Calculation from "./Calculation";

const InvoiceItemList = () => {
  return (
    <>
      <div className="mt-[52px] max-w-[840px]">
        <div className="border border-slate-200">
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-lg font-medium text-black">Products</h1>
              <Badge className="h-7" variant="outline">
                3 Products
              </Badge>
            </div>
            <Button className="bg-primary-200 text-black">
              <SlPrinter /> <span className="ml-2">Export</span>
            </Button>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg h-14">
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-b-2 border-slate-200">
              <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
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
              </TableRow>
              <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
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
              </TableRow>
              {/* calculated part */}
              <Calculation />
            </TableBody>
          </Table>
        </div>
        <div className="mt-10 mb-[60px]">
          <div className="flex justify-end gap-4">
            <Button className="text-sm px-6 bg-white text-primary-900 border border-primary-900">
              Cancel
            </Button>
            <Button className="text-sm px-6">Send Invoice</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceItemList;
