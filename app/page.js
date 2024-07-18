"use client";

import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Loader />
    </div>
  );
};

export default RootPage;
