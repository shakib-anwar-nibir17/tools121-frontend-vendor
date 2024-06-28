"use client";

import { format } from "date-fns";

import { DateIconSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "/lib/utils";
import { useState } from "react";
import CustomerInfo from "./CustomerInfo";
import InvoiceItemList from "./InvoiceItemList";

export default function InvoiceInformation() {
  const [date, setDate] = useState();
  return (
    <div>
      <h1 className="text-2xl font-bold text-black">Invoice Information</h1>
      <div className="flex items-center gap-4 mt-10">
        <div className="space-y-4">
          <div>
            <h3>Invoice Number</h3>
          </div>
          <div className="h-10 w-[240px] border border-slate-200 px-4 py-2 rounded-lg">
            <p>#234266</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3>Invoice Date</h3>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-between flex-row-reverse text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <DateIconSVG />
                {date ? format(date, "PPP") : <span>06 / 06 / 24</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-4">
          <div>
            <h3>Due date</h3>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-between flex-row-reverse text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <DateIconSVG />
                {date ? format(date, "PPP") : <span>06 / 06 / 24</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* general and customer information */}
      <CustomerInfo />
      <div>
        <InvoiceItemList />
      </div>
    </div>
  );
}
