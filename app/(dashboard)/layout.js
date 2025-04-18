import Header from "@/components/common/Header";
import SidebarWrapper from "@/components/common/SidebarWrapper";

// import { useEffect, useState } from "react";

export default function MainDashboardLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
        <SidebarWrapper />
        <div className="w-full relative">
          <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
    </>
  );
}
