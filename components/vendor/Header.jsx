"use client";
import { UserOutlinedIcon, UserProfileIcon } from "@/components/icons/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [authToken, setAuthToken] = useState(true);
  return (
    <nav className="xl:border-b  border-primary-200 pb-6 mt-6">
      <div className="sm:px-8 container mx-auto px-4">
        <div className="hidden xl:flex justify-between">
          <Link href={"/"}>
            <Image
              className="w-auto h-auto"
              src="/logo.png"
              alt="logo"
              priority={false}
              width={219}
              height={54}
            />
          </Link>
          {/* sign in button */}
          <div className="flex space-x-6">
            {authToken ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-900 hover:text-primary-950">
                  <UserProfileIcon className="h-12 w-12 text-gray-300 border rounded-full hover:ring-2" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem>
                    <Link
                      href={"/profile"}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left cursor-pointer">
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/signin"}>
                <div className="flex items-center min-w-0 gap-x-3">
                  <UserOutlinedIcon className="w-6 h-6" />
                  <div>
                    <p className="text-primary-600 font-medium pb-px">
                      Sign in
                    </p>
                    <p className="text-primary-950 font-bold">
                      <strong>Account</strong>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="px-4 xl:hidden flex justify-between items-center gap-4 py-4 sm:px-8 border-t border-b border-primary-200">
        <div>
          {authToken ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-900 hover:text-primary-950">
                <UserProfileIcon className="h-12 w-12 text-gray-300 border rounded-full hover:ring-2" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white" align="end">
                <DropdownMenuItem>
                  <Link
                    href={"/profile"}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/signin"}>
              <div className="flex items-center min-w-0 gap-x-2">
                <UserOutlinedIcon className="w-4 h-4" />
                <p className="text-xs text-primary-950 font-medium pb-px leading-[32px]">
                  Sign in
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
