import { ShopSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";

const ShopInfoForm = () => {
  return (
    <form className="mt-9 mb-20">
      <div className="border border-slate-200 rounded-2xl pb-8 mb-6">
        <div className="p-4 border-b">
          <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
            <ShopSVG /> Shop Information
          </p>
        </div>
        <div className="px-9 py-5.5">
          <div className="flex justify-between gap-6">
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">Shop Name*</label>
              <input
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
                type="text"
                placeholder="Shop name"
              />
            </div>
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">
                Shop Category*
              </label>
              <select
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
                type="text"
                placeholder="Shop name"
              >
                <option className="text-primary-950">Select Category</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">
                Contact Number*
              </label>
              <input
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
                type="text"
                placeholder="Enter mobile number"
              />
            </div>
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">
                Business Identification Number (BIN)*
              </label>
              <input
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
                type="text"
                placeholder="Enter BIN number"
              />
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">
                Tax Identification Number (TIN)*
              </label>
              <input
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
                type="text"
                placeholder="Enter TIN"
              />
            </div>
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">
                Email Address*
              </label>
              <input
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
                type="email"
                placeholder="Type Email Address"
              />
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="w-full mt-6">
              <label className=" text-primary-950 font-bold">Location*</label>
              <textarea
                className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
                type="text"
                placeholder="Enter location details"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
          Reset
        </Button>
        <Button className="text-xl px-6">Save</Button>
      </div>
    </form>
  );
};

export default ShopInfoForm;
