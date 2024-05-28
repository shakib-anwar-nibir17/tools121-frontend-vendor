import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";

export default function InventoryLayout({ children }) {
  return (
    <>
      <main>
        <HeaderLinkWrapper />
        {children}
      </main>
    </>
  );
}
