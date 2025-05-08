"use client";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SidebarMobile from "@/components/common/SidebarMobile";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

const MainDashboardWrapper = ({ children }) => {
  // Fixed the children prop destructuring
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Header setIsOpen={setOpen} />
      <main className="flex">
        <Sidebar />
        <div className="w-full relative">
          <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
      <SheetContent className="bg-white space-y-6 w-[80%] h-full overflow-y-auto">
        <div>
          <DropdownMenu />
        </div>
        <SidebarMobile setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default MainDashboardWrapper;
