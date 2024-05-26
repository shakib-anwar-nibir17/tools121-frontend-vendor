const GeneralInfo = () => {
  return (
    <div className="p-6 border border-slate-300 rounded-lg mt-6">
      <h1 className="text-lg text-black">General Information</h1>
      <div className="mt-5 border border-slate-300 p-6 rounded-lg">
        <h1 className="text-lg text-black">Category</h1>
        <div className="w-full mt-5 mb-5">
          <label className=" text-primary-950 font-bold">
            Product Category
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-transparent px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
        <div className="w-full mt-5">
          <label className=" text-primary-950 font-bold">
            Product Sub-Category
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-transparent px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Sub-Category</option>
          </select>
        </div>
      </div>

      <div className="w-full mt-5 mb-5">
        <label className="font-bold text-black">Product Name</label>
        <input
          className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
          type="text"
          placeholder="Type product name"
        />
      </div>
      <div className="w-full">
        <label className=" text-primary-950 font-bold">
          Product Description
        </label>
        <textarea
          className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
          type="text"
          placeholder=" Product Description"
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
