import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import ShopBanner from "./ShopBanner";

const profileOptions = [
  {
    key: "Profile",
    value: "profile",
    route: "store-settings/profile-settings/profile",
  },
  {
    key: "Verify Shops",
    value: "verify-shops",
    route: "store-settings/profile-settings/verify-shops",
  },
];

const ShopInfo = ({ value }) => {
  return (
    <div className="mb-8">
      <ShopBanner />
      <Tabs defaultValue={value}>
        <TabsList className="gap-12 mt-[60px] font-bold text-primary-950 p-0">
          {profileOptions.map((option) => (
            <Link key={option.value} href={`/${option.route}`}>
              <TabsTrigger
                className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900 w-[132px]"
                value={option.value}
              >
                <span className="py-4">{option.key}</span>
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ShopInfo;
