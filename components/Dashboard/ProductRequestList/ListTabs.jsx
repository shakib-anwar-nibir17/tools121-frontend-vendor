import PaginationCom from "@/components/common/PaginationCom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoProducts from "../ProductList/NoProducts";
import ListDataTable from "./ListDataTable";
import PaginationServerside from "@/components/common/PaginationServerside";
import Loader from "@/components/common/Loader";

const ListTabs = ({
  requestData,
  totalPage,
  tabHandler,
  tabVal,
  options,
  buttonHandler,
  pagiNateHandler,
  isFetching,
  reqProductDeleteHandler,
  deleteId
}) => {
  console.log(tabVal)
  return (
    <Tabs defaultValue="all-products">
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
                <span className="py-4 text-primary-900">
                  ({option?.amount})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div>
          <div className="flex items-center gap-3">
            {
              totalPage > 0 && <PaginationServerside pagiNateHandler={pagiNateHandler} totalPage={totalPage}/>
            }
          </div>
        </div>
      </div>
      {
        isFetching ?  <div className=" w-full flex flex-row justify-center items-center h-screen">
          <Loader />
        </div> :
        <div className="w-full">
          
          {requestData?.length > 0 ? (
            <TabsContent value={tabVal}>
              <ListDataTable deleteId={deleteId} reqProductDeleteHandler={reqProductDeleteHandler} requestData={requestData} />
            </TabsContent>
          ) : (
            <NoProducts
              title="No Product requested Yet?"
              suggestion="Request new products from your store and start selling."
              buttonHandler={buttonHandler}
            />
          )}
      </div>
      }
      
      <div className="flex justify-end">
        {
          totalPage > 0 &&  <PaginationServerside pagiNateHandler={pagiNateHandler} totalPage={totalPage}/>
        }
      
      </div>
    </Tabs>
  );
};

export default ListTabs;
