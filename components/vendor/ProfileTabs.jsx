import ProfileContent from "@/components/Dashboard/Profile/ProfileContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorProfile from "@/components/vendor/VendorProfile";

export const profileOptions = [
  {
    key: "Overview",
    value: "overview",
  },
  {
    key: "Profile",
    value: "profile",
  },
  {
    key: "Verify Shops",
    value: "verify_shops",
  },
  {
    key: "Reviews",
    value: "reviews",
  },
];

const ProfileTabs = () => {
  console.log(profileOptions);
  return (
    <Tabs defaultValue="profile">
      <div className="border border-slate-200 px-6 pt-4 py-3 rounded-xl box-border shadow-md">
        <VendorProfile />
        <TabsList className="space-x-6 justify-between mt-12 font-bold text-primary-950 p-0">
          {profileOptions.map((option) => (
            <TabsTrigger
              key={option.value} // Remember to add a unique key when mapping over components in React
              className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900"
              value={option.value}
            >
              <span className="py-4">{option.key}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div>
        <TabsContent value="profile">
          <ProfileContent />
        </TabsContent>
        <TabsContent value="verify">Change your password here.</TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
