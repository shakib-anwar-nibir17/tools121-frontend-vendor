import CustomSelect from "@/components/common/CustomSelect";
import PaginationComponent from "@/components/common/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListDataTable from "./ListDataTable";
import PaginationCom from "@/components/common/PaginationCom";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";
import NoProducts from "../ProductList/NoProducts";

const ListTabs = ({requestData, totalData, tabHandler, tabVal, options,buttonHandler}) => {
  
  return (
    <Tabs defaultValue={tabVal}>
      <div className="flex items-center mt-10 justify-between">
        <div>
          <TabsList className="gap-12 font-bold text-primary-950 p-0">
            {options.map((option) => (
              <TabsTrigger
                key={option.value}
                onClick={() => tabHandler(option.value)}
                className="text-base pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900 w-[132px]"
                value={option.value}
              >
                <p className="py-4">{option.key}</p>
                <span className="py-4 text-primary-900">({option?.amount})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <PaginationCom array={totalData}/>
          </div>
        </div>
      </div>
      {
        requestData?.length > 0 ?  <TabsContent value={tabVal}>
        <ListDataTable requestData={requestData} />
      </TabsContent> :<NoProducts buttonHandler={buttonHandler} />
      }
     
      <div className="flex justify-end">
      <PaginationCom array={totalData}/>
      </div>
    </Tabs>
  );
};

export default ListTabs;
