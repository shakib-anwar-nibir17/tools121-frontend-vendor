"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";

export function CalendarDateRangePicker({ className }) {
  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] flex-row-reverse gap-4 justify-start text-left font-bold text-black",
              !date && "text-black border-2 border-slate-300 font-bold"
            )}
          >
            <SlCalender className="mr-2 h-4 w-4 text-black" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="mt-10 mb-5 flex justify-end gap-4 px-4 items-center">
            <div className="text-black">
              <p className="text-[14px]">1 May 2024 - 22 May 2024</p>
              <p className="text-[12px]">Dhaka Time</p>
            </div>
            <Button className="bg-slate-200 text-black">Cancel</Button>
            <Button>Update</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
