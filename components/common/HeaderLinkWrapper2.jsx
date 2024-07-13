"use client";
import { convertRoute } from "@/utils/utils";

import HeaderLinks from "@/components/common/HeaderLinks";
import { usePathname } from "next/navigation";

const HeaderLinkWrapper2 = () => {
  const pathname = usePathname();
  const paths = convertRoute(pathname);
  console.log(paths);

  return (
    <>
      <HeaderLinks paths={paths} />
    </>
  );
};

export default HeaderLinkWrapper2;
