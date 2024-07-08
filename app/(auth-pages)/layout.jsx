import AuthImage from "@/components/auth/AuthImage";
import SiteLogo from "@/components/common/SiteLogo";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen relative">
      <div className="grid grid-cols-1 md:grid-cols-10">
        <SiteLogo />
        <div className="md:col-span-6 flex justify-center items-center border-1 border-red-500">
          <div className="w-full">
            <div className="w-full 2xl:px-[320px] xl:px-56 lg:px-36 md:px-20 sm:px-20 px-10">
              {children}
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  );
}
