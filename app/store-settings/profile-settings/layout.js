import PageHeader from "@/components/common/PageHeader";
import ShopInfo from "@/components/common/ShopInfo";

export default function ProfileSettingsLayout({ children }) {
  return (
    <>
      <PageHeader />
      <ShopInfo />
      {children}
    </>
  );
}
