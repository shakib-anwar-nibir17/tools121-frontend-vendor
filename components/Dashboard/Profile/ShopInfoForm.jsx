import { Button } from "@/components/ui/button";

const ShopInfoForm = () => {
  return (
    <form className="mt-4 mb-20">
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
          <label className=" text-primary-950 font-bold">Shop Category*</label>
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
          <label className=" text-primary-950 font-bold">Contact Number*</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Email Address*</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="email"
            placeholder="Type Email Address"
          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Address*</label>
          <textarea
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Enter location details (e.g. Shop no, house no, road no etc.)"
          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">About Us*</label>
          <textarea
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Write something about your shop within 100 words... "
          />
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
