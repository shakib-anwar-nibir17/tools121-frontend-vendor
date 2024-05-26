"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const PageHeader = ({ paths }) => {
  return (
    <>
      {/* <div className="mb-6">
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
              <BreadcrumbLink>{paths[2]}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-black pb-2">
          {paths[paths.length - 1]}
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={index === 0 ? "text-[#3250FF] text-sm" : ""}
                  >
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator>
                    <FaCaretRight size={2} />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};

export default PageHeader;
