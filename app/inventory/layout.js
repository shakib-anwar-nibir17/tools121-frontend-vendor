"use client";
import HeaderLinks from "@/components/common/HeaderLinks";
import { convertRoute } from "@/lib/utils";

import { usePathname } from "next/navigation";

export default function InventoryLayout({ children }) {
  const pathname = usePathname();
  const paths = convertRoute(pathname);

  return (
    <>
      <main>
        <HeaderLinks paths={paths} />
        {children}
      </main>
    </>
  );
}
