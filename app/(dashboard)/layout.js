import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

export default function MainDashboardLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="w-full relative">
          <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
    </>
  );
}
