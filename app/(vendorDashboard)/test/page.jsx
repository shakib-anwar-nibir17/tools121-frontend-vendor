import { VendorProfileSVG } from "@/components/Icons/Icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTabs from "@/components/vendor/ProfileTabs";
import { vendorProfile } from "@/lib/tabOptions";

const TestPage = () => {
  return (
    <div>
      <div className="mx-auto container px-4 sm:px-6 sm:pt-8 lg:px-8 pb-16 min-h-screen">
        <Tabs
          defaultValue="profile"
          orientation="horizontal"
          className="lg:flex lg:space-x-14 pt-0 2xl:pt-4"
        >
          <TabsList className="w-[300px] 2xl:w-[350px] flex-shrink-0 inline-block">
            <h3 className="font-bold text-lg py-6 text-primary-950">Menu</h3>
            {vendorProfile.slice(0, -2).map((item) => (
              <TabsTrigger
                key={item.value} // Don't forget to add a unique key for each rendered item
                value={item.value}
                className={`group m-0 border-none text-left font-medium rounded-lg text-primary-950 flex items-center w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950`}
              >
                <div className="mx-4 w-6 h-6">
                  <VendorProfileSVG />
                </div>
                {item.key}
              </TabsTrigger>
            ))}
            <h3 className="font-bold text-lg py-6 text-primary-950">
              Settings
            </h3>
            {vendorProfile.slice(-2).map((item) => (
              <TabsTrigger
                key={item.value} // Don't forget to add a unique key for each rendered item
                value={item.value}
                className={`group m-0 border-none text-left font-medium rounded-lg text-primary-950 flex items-center w-full justify-start h-12 2xl:h-14 mb-3 hover:bg-primary-50 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-950`}
              >
                <div className="mx-4 w-6 h-6">
                  <VendorProfileSVG />
                </div>
                {item.key}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile" className="w-full">
            <ProfileTabs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestPage;
