import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorProfile from "@/components/vendor/VendorProfile";
import ProfileContent from "@/components/vendor/contents/ProfileContent";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="profile">
      <div className="border border-slate-200 px-6 pt-4 py-3 rounded-xl box-border shadow-md">
        <VendorProfile />
        <TabsList className="space-x-6 justify-between mt-12 font-bold text-primary-950 p-0">
          <TabsTrigger
            className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4  data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900"
            value="overview"
          >
            <span className="py-4">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4  data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900"
            value="profile"
          >
            <span className="py-4">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4  data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900"
            value="verify"
          >
            <span className="py-4">Verify Shop</span>
          </TabsTrigger>
          <TabsTrigger
            className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4  data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900"
            value="reviews"
          >
            <span className="py-4">Reviews</span>
          </TabsTrigger>
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
