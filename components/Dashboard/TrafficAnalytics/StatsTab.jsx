import CustomSelect from "@/components/common/CustomSelect";
import PaginationComponent from "@/components/common/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsTable from "./StatsTable";

const Options = [
  {
    key: "All Pages",
    value: "all-pages",
    amount: 100,
  },
];

const StatsTab = () => {
  return (
    <Tabs defaultValue="all-pages">
      <div className="flex items-center mt-10 justify-between">
        <div>
          <TabsList className="gap-12 font-bold text-primary-950 p-0">
            {Options.map((option) => (
              <TabsTrigger
                key={option.value}
                className="text-base pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900 w-[132px]"
                value={option.value}
              >
                <p className="py-4">{option.key}</p>
                <span className="py-4 text-primary-900">({option.amount})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <p className="text-black">Show</p>
            <CustomSelect />
            <PaginationComponent />
          </div>
        </div>
      </div>
      <TabsContent value="all-pages">
        <StatsTable />
      </TabsContent>
      <div className="flex justify-end mt-8">
        <PaginationComponent />
      </div>
    </Tabs>
  );
};

export default StatsTab;
