const MainHeader = () => {
  return (
    <div className="mt-10 grid grid-cols-4 gap-5 w-full">
      <div className=" rounded-2xl h-[160px] bg-[#E7FFEA] border border-[#2EBF43] text-[#2EBF43] flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">Todays Quotations</h1>
        <p className="text-[32px]">15</p>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#FFE3EF] border border-[#FF1E7C] text-[#FF1E7C] flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">Unread Quotations</h1>
        <p className="text-[32px]">50</p>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#D7E7FF] border border-primary-900 text-primary-900 flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">Total Quotations</h1>
        <p className="text-[32px]">300</p>
      </div>
      <div className=" rounded-2xl h-[160px] bg-[#FFF4D7] border border-[#FFB800] text-[#FFB800] flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">Pinned Quotations</h1>
        <p className="text-[32px]">45</p>
      </div>
    </div>
  );
};

export default MainHeader;
