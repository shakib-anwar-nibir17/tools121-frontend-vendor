import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoProducts from "../ProductList/NoProducts";
import AllRequestDataTable from "./AllRequestDataTable";
import Loader from "@/components/common/Loader";
import PaginationServerside from "@/components/common/PaginationServerside";

const AllRequest = ({
  tableData,
  options,
  tabVal,
  tabHandler,
  totalPage,
  quotationActionSubmit,
  isFetching,
  pagiNateHandler,
  from,
  setReplyId,
  replyId,
  repleyHandler,
  setReplyText
}) => {
  // console.log('tab val ---->', tabVal)
  return (
    <Tabs defaultValue="all-request">
      <div className="flex items-center mt-10 justify-between">
        <div>
          <TabsList className="gap-12 font-bold text-primary-950 p-0">
            {options?.map((option) => (
              <TabsTrigger
                key={option?.value}
                className="text-base pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900 w-[132px]"
                value={option?.value}
                onClick={() => tabHandler(option.value)}
              >
                <p className="py-4">{option?.key}</p>
                <span className="py-4 text-primary-900">
                  ({option?.amount})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="flex flex-row justify-end">
          <div>
              {
              totalPage > 0 &&  <PaginationServerside pagiNateHandler={pagiNateHandler} totalPage={totalPage}/>
            }
          </div>
        </div>
      </div>
      {
        isFetching ?  <Loader /> : <>
         {tableData?.length > 0 ? (
        <TabsContent value={tabVal}>
          <AllRequestDataTable
            quotationActionSubmit={quotationActionSubmit}
            tableData={tableData}
            from={from}
            setReplyId={setReplyId}
            replyId={replyId}
            repleyHandler={repleyHandler}
            setReplyText={setReplyText}
          />
        </TabsContent>
      ) : (
        <NoProducts
          title="You Have No quotation yet"
          suggestion=""
          buttonShow={false}
        />
      )}
        </>
      }
     
    </Tabs>
  );
};

export default AllRequest;
