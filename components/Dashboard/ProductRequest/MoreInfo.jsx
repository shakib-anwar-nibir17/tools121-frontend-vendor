const MoreInfo = () => {
  return (
    <>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Pricing</h1>
        <div className="w-full mt-5">
          <label className="font-bold text-black">Base Price</label>
          <input
            className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="$    Type base price"
          />
        </div>
      </div>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Inventory</h1>
        <div className="flex gap-6">
          <div className="w-full mt-5">
            <label className="font-bold text-black">SKU</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product sku here"
            />
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Barcode</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product barcode here"
            />
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Quantity</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product quantity here"
            />
          </div>
        </div>
      </div>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Weight</h1>
        <div className="flex gap-6">
          <div className="w-full mt-5">
            <label className="font-bold text-black">Weight</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Product weight"
            />
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Height</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Height (cm)"
            />
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Length</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Length (cm)"
            />
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Width</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Width (cm)"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
