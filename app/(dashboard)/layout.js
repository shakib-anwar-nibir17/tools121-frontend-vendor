// "use client";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SidebarMobile from "@/components/common/SidebarMobile";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function MainDashboardLayout({ children }) {
  return (
    <Sheet>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="w-full relative">
          <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
      <SheetContent className="bg-white space-y-6">
        <div>
          <DropdownMenu />
        </div>
        <SidebarMobile />
      </SheetContent>
    </Sheet>
  );
}
