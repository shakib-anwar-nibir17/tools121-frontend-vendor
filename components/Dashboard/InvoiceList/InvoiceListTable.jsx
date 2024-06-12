"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { MdRemoveRedEye } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import CustomerInfo from "../CreateNewOrder/CustomerInfo";
import InvoiceItemList from "../CreateNewOrder/InvoiceItemList";

const InvoiceListTable = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Table className="mt-10 mb-20">
        <TableHeader>
          <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
            <TableHead>Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Invoice Note</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b-2 border-slate-200">
          <TableRow className="text-black border-b-2 border-slate-200">
            <TableCell className="font-medium">#234266</TableCell>
            <TableCell>Abdur Rahman</TableCell>
            <TableCell>abdurrahman@gmail.com</TableCell>
            <TableCell>01749487034</TableCell>
            <TableCell>Sher-e-Bangla Nagar Dhaka, Bangladesh</TableCell>
            <TableCell>Invoice should get in time</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MdRemoveRedEye
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                  size={22}
                />
                <FiPrinter size={22} />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-black border-b-2 border-slate-200">
            <TableCell className="font-medium">#234266</TableCell>
            <TableCell>Abdur Rahman</TableCell>
            <TableCell>abdurrahman@gmail.com</TableCell>
            <TableCell>01749487034</TableCell>
            <TableCell>Sher-e-Bangla Nagar Dhaka, Bangladesh</TableCell>
            <TableCell>Invoice should get in time</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MdRemoveRedEye
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                  size={22}
                />
                <FiPrinter size={22} />
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="text-black border-b-2 border-slate-200">
            <TableCell className="font-medium">#234266</TableCell>
            <TableCell>Abdur Rahman</TableCell>
            <TableCell>abdurrahman@gmail.com</TableCell>
            <TableCell>01749487034</TableCell>
            <TableCell>Sher-e-Bangla Nagar Dhaka, Bangladesh</TableCell>
            <TableCell>Invoice should get in time</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MdRemoveRedEye
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                  size={22}
                />
                <FiPrinter size={22} />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div
        className={`absolute ${
          open ? "block" : "hidden"
        } px-[50px] py-[86px] bg-white shadow-2xl top-0 right-0`}
      >
        <div className="flex justify-end">
          <RxCrossCircled onClick={() => setOpen(!open)} />
        </div>

        <CustomerInfo />
        <InvoiceItemList />
      </div>
    </>
  );
};

export default InvoiceListTable;
