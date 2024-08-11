import {
  PinnedQuotationSVG,
  TodaysQuotationSVG,
  TotalQuotationSVG,
  UnreadQuotationSVG,
} from "@/components/icons/Icons";

const MainHeader = ({ todaysQuotation, pinnedData, unreadData, data }) => {
  return (
    <div className="mt-10 grid grid-cols-4 gap-5 w-full">
      <div className=" rounded-2xl h-[160px] bg-[#E7FFEA] border border-[#2EBF43] text-[#2EBF43] flex justify-center items-center gap-4">
        <TodaysQuotationSVG />
        <div>
          <h1 className="text-2xl">{todaysQuotation} Quotations</h1>
          <p>Todays</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#FFE3EF] border border-[#FF1E7C] text-[#FF1E7C] flex justify-center items-center gap-4">
        <UnreadQuotationSVG />
        <div>
          <h1 className="text-2xl">{unreadData} Quotations</h1>
          <p>Unread</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex justify-center items-center gap-4">
        <TotalQuotationSVG />
        <div>
          <h1 className="text-2xl">{data} Quotations</h1>
          <p>Total</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#FFF4D7] border border-[#FFB800] text-[#FFB800] flex justify-center items-center gap-4">
        <PinnedQuotationSVG />
        <div>
          <h1 className="text-2xl">{pinnedData} Quotations</h1>
          <p>Pinned</p>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
