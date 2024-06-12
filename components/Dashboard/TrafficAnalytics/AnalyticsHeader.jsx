import {
  NewUserStatSVG,
  PageViewStatSVG,
  ReturnTimeSVG,
  UserStatSVG,
} from "@/components/icons/Icons";

const AnalyticsHeader = () => {
  return (
    <div className="mt-10 grid grid-cols-4 gap-5 w-full">
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex justify-center items-center gap-4">
        <UserStatSVG />
        <div>
          <h1 className="text-2xl">8K</h1>
          <p className="text-black font-bold">Total</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex justify-center items-center gap-4">
        <NewUserStatSVG />
        <div>
          <h1 className="text-2xl">3K</h1>
          <p className="text-black font-bold">Total</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex justify-center items-center gap-4">
        <PageViewStatSVG />
        <div>
          <h1 className="text-2xl">15, 345</h1>
          <p className="text-black font-bold">Total</p>
        </div>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex justify-center items-center gap-4">
        <ReturnTimeSVG />
        <div>
          <h1 className="text-2xl">1K</h1>
          <p className="text-black font-bold">Total</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
