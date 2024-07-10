import CustomSelect from "@/components/common/CustomSelect";
import PaginationComponent from "@/components/common/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListDataTable from "./ListDataTable";
import PaginationCom from "@/components/common/PaginationCom";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";

const Options = [
  {
    key: "All Products",
    value: "all-products",
    amount: 200,
  },
  {
    key: "Approved",
    value: "approved",
    amount: 100,
  },
  {
    key: "Pending",
    value: "pending",
    amount: 50,
  },
  {
    key: "Rejected",
    value: "rejected",
    amount: 50,
  },
];

const ListTabs = ({requestData}) => {
  const { pageData, setCurrentPage } = useStateContext();
  const [allRequestProducts, setAllRequestProducts] = useState([])
  
  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  },[setCurrentPage])

  useEffect(() => {
    setAllRequestProducts(pageData);
  }, [pageData, allRequestProducts]);

  console.log('Page data ===>', pageData)
  return (
    <Tabs defaultValue="all-products">
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
            <PaginationCom array={requestData}/>
          </div>
        </div>
      </div>
      <TabsContent value="all-products">
        <ListDataTable requestData={allRequestProducts} />
      </TabsContent>
      <div className="flex justify-end">
      <PaginationCom array={requestData}/>
      </div>
    </Tabs>
  );
};

export default ListTabs;
