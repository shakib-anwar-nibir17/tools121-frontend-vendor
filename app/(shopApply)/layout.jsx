import Header from "@/components/common/Header";
import ShopBanner from "@/components/shop-application/ShopBanner";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex 2xl:px-28 mt-16 max-w-[1440px] mx-auto">
        <div className="flex-1">{children}</div>
        <ShopBanner />
      </main>
    </>
  );
}
