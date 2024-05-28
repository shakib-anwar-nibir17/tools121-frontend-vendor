"use client";
import { convertRoute } from "@/lib/utils";

import HeaderLinks from "@/components/common/HeaderLinks";
import { usePathname } from "next/navigation";

const HeaderLinkWrapper = () => {
  const pathname = usePathname();
  const paths = convertRoute(pathname);

  return (
    <>
      <HeaderLinks paths={paths} />
    </>
  );
};

export default HeaderLinkWrapper;
