const MoreInfo = ({control, errors, register, singleProductRequestData}) => {
  return (
    <>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Pricing</h1>
        <div className="w-full mt-5">
          <label className="font-bold text-black">Base Price</label>
          <input
           {...register("product_rate")}
           defaultValue={singleProductRequestData?.product_rate}
            className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="$    Type base price"
          />
          {errors.product_rate?.message && (
            <div className="text-red-500">{errors.product_rate?.message}</div>
          )}
        </div>
      </div>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Inventory</h1>
        <div className="flex gap-6">
          <div className="w-full mt-5">
            <label className="font-bold text-black">SKU</label>
            <input
             {...register("sku")}
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product sku here"
            />
            {errors.skue?.message && (
            <div className="text-red-500">{errors.sku?.message}</div>
            )}
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Barcode</label>
            <input
             {...register("barcode")}
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product barcode here"
            />
            {errors.barcode?.message && (
            <div className="text-red-500">{errors.barcode?.message}</div>
            )}
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Quantity</label>
            <input
            {...register("quantity")}
            defaultValue={singleProductRequestData?.purchase_quantity}
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Type product quantity here"
            />
            {errors.barcode?.message && (
            <div className="text-red-500">{errors.barcode?.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 border border-slate-300 mt-6 rounded-lg">
        <h1 className="text-lg text-black">Weight</h1>
        <div className="flex gap-6">
          <div className="w-full mt-5">
            <label className="font-bold text-black">Weight</label>
            <input
             {...register("weight")}
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Product weight"
            />
             {errors.weight?.message && (
            <div className="text-red-500">{errors.weight?.message}</div>
            )}
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Height</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Height (cm)"
              {...register("height")}
            />
             {errors.height?.message && (
            <div className="text-red-500">{errors.height?.message}</div>
            )}
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Length</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Length (cm)"
              {...register("length")}
            />
            {errors.length?.message && (
            <div className="text-red-500">{errors.length?.message}</div>
            )}
          </div>
          <div className="w-full mt-5">
            <label className="font-bold text-black">Width</label>
            <input
              className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
              type="text"
              placeholder="Width (cm)"
              {...register("width")}
            />
             {errors.width?.message && (
            <div className="text-red-500">{errors.width?.message}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
