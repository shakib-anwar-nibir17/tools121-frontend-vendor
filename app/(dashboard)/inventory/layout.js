import HeaderLinkWrapper2 from "@/components/common/HeaderLinkWrapper2";

export default function InventoryLayout({ children }) {
  return (
    <>
      <main className="relative">
        <HeaderLinkWrapper2 />
        {children}
      </main>
    </>
  );
}
