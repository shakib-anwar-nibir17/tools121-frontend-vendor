"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { FaCaretRight } from "react-icons/fa";
import ShopInfo from "../Dashboard/Profile/ShopInfo";

const convertRoute = (route) => {
  return route
    .split("/")
    .filter((part) => part)
    .map((part) =>
      part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
};

const PageHeader = () => {
  const pathname = usePathname();
  const values = pathname.split("/").filter(Boolean);
  const paths = convertRoute(pathname);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-black pb-2">{paths[2]}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#3250FF] text-sm">
                {paths[0]}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <FaCaretRight size={2} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>{paths[1]}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <FaCaretRight size={2} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{paths[2]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ShopInfo value={values[2]} />
    </>
  );
};

export default PageHeader;
