/* eslint-disable no-unused-vars */
"use client";
import { useUserDataQuery } from "@/app/redux/features/userInfo";
import { UserProfileIcon } from "@/components/icons/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/constant/urls";
import { capitalizeFirstTwo } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { PiSquaresFour } from "react-icons/pi";
import { useSelector } from "react-redux";
import { SheetTrigger } from "../ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const loginName = useSelector((state) => state.authStore.loginName);
  const token = localStorage.getItem("vendorToken");
  const { data: profileInfo } = useUserDataQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const router = useRouter();
  const logOutHandler = () => {
    document.cookie = "vendorToken=; path=/; max-age=0; secure";
    localStorage.clear();
    setTimeout(() => {
      router.push("/signin");
    }, 500);
  };

  return (
    <nav className="xl:border-b  border-primary-200 pb-6 mt-6">
      <div className="sm:px-8 px-12">
        <div className="flex justify-between items-center">
          <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}`}>
            <Image
              className="w-auto h-auto"
              src="/logo.png"
              alt="logo"
              priority={false}
              width={180}
              height={44}
            />
          </Link>
          {/* sign in button */}
          <div className="flex space-x-6 items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex justify-center items-center text-sm font-medium text-gray-900 hover:text-primary-950 outline-none">
                {profileInfo?.data?.logo_url ? (
                  <div className="h-12 w-12 border rounded-full hover:ring-2 relative">
                    <Image
                      fill
                      src={`${BASE_URL}/generate-file/?file_path=${profileInfo?.data?.logo_url}`}
                      alt="profile"
                      className="rounded-full w-full h-full"
                    />
                  </div>
                ) : (
                  <UserProfileIcon className="h-12 w-12 text-gray-300 border rounded-full hover:ring-2" />
                )}

                <span className="ml-2 text-lg mr-2 font-medium hidden lg:block">
                  Hi,
                </span>
                {profileInfo?.data?.name ? (
                  <span className="text-lg font-bold mr-3 hidden lg:block">
                    {loginName.loginName}
                  </span>
                ) : (
                  <span className="text-lg font-bold mr-3">Test User</span>
                )}

                <MdArrowDropDown size={20} className="mt-1" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-white max-w-[300px] h-[216px]"
                align="end"
              >
                <div className="p-6 flex items-center gap-2 border-b-2 border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white">
                    {profileInfo?.data?.name ? (
                      <p>{capitalizeFirstTwo(profileInfo?.data?.name)}</p>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div>
                    {profileInfo?.data?.name ? (
                      <h2 className="font-bold text-black">
                        {profileInfo?.data?.name}
                      </h2>
                    ) : (
                      <h2 className="font-bold text-black">Test User</h2>
                    )}

                    <p className="text-sm">General Account</p>
                  </div>
                </div>
                <DropdownMenuItem>
                  <div
                    onClick={() => router.push("/profile-settings/profile")}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left flex items-center gap-6 text-medium text-lg"
                  >
                    <PiSquaresFour size={24} /> Account Settings
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    onClick={() => {
                      logOutHandler();
                    }}
                    className="flex items-center text-lg text-medium gap-6 px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left cursor-pointer"
                  >
                    <GrLogout size={20} /> Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="xl:hidden mt-2">
              <SheetTrigger>
                <GiHamburgerMenu size={24} />
              </SheetTrigger>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
