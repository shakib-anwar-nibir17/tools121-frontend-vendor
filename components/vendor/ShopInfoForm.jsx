const ShopInfoForm = () => {
  return (
    <form className="mt-2 mb-8">
      <div className="flex justify-between gap-6 px-8">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">Shop Name*</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Shop name"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">
            Shop Category*
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-6 px-8">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">
            Contact Number*
          </label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">
            Business Identification Number (BIN)*
          </label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Enter BIN number"
          />
        </div>
      </div>
      <div className="flex justify-between gap-6 px-8">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">
            Tax Identification Number (TIN)*
          </label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Enter TIN"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">Shop Area*</label>
          <select
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select area</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-6 px-8">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-medium">Location*</label>
          <textarea
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Enter location details"
          />
        </div>
      </div>
    </form>
  );
};

export default ShopInfoForm;
