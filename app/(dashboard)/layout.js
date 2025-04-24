// "use client";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function MainDashboardLayout({ children }) {
  return (
    <Sheet>
      <Header />
      <main className="flex hidden">
        <Sidebar />
        <div className="w-full relative">
          <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
      <SheetContent className="bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
