"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlLogout } from "react-icons/sl";

const LogoutButtonSidebar = () => {
  const router = useRouter();

  const logOutHandler = () => {
    localStorage.clear();
    setTimeout(() => {
      router.push("/signin");
    }, 500);
  };
  return (
    <Link href="/signin" className="w-full px-6 flex items-center gap-3">
      <SlLogout size={24} color="#0d6efd" />

      <button
        onClick={() => {
          logOutHandler();
        }}
        className="text-primary-900 font-medium"
      >
        Logout
      </button>
    </Link>
  );
};

export default LogoutButtonSidebar;
