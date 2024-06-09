"use client";

import ShopInfo from "@/components/Dashboard/Profile/ShopInfo";
import HeaderLinks from "@/components/common/HeaderLinks";
import { convertRoute } from "@/lib/utils";

import { usePathname } from "next/navigation";

export default function ProfileSettingsLayout({ children }) {
  const pathname = usePathname();
  const values = pathname.split("/").filter(Boolean);
  const paths = convertRoute(pathname);
  return (
    <>
      <HeaderLinks paths={paths} />
      <ShopInfo value={values[2]} />
      {children}
    </>
  );
}
