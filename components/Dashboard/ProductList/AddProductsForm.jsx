import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsExclamationCircle } from "react-icons/bs";

const AddProductsForm = ({ setShowForm }) => {
  return (
    <form className="max-w-[996px]">
      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">
            Product Category*
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
        <div className="w-full">
          <label className=" text-primary-950 font-bold">
            Product Subcategory*
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
      </div>
      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Name*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Brand*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
      </div>
      <div className="flex mb-6">
        <div className="h-[71px] border border-slate-200 py-3 px-4 w-1/2 rounded-lg flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image
              src={"/not-found-product.png"}
              width={21}
              height={21}
              alt="not-found-product"
            />
            <p className="text-[14px]">Product not found?</p>
            <BsExclamationCircle color="#FF1E7C" />
          </div>
          <Link href="#" className="text-primary-900 underline text-[14px]">
            Click Here
          </Link>
        </div>
      </div>
      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Model*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Engine*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
          </select>
        </div>
      </div>
      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className="font-bold">Regular Price</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Regular Price"
          />
        </div>
        <div className="w-full">
          <label className="font-bold">New Price</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="....."
          />
        </div>
        <div className="w-full">
          <label className="font-bold">Stock</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="number"
            placeholder="...."
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Delivery Note*</label>
          <textarea
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Delivery Note"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">
            Production Specification*
          </label>
          <textarea
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Production Specification"
          />
        </div>
      </div>
      <div className="mt-10 mb-[60px]">
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setShowForm(false)}
            className="text-xl px-6 bg-white text-primary-900 border border-primary-900"
          >
            Cancel
          </Button>
          <Button className="text-xl px-6">Add Products</Button>
        </div>
      </div>
    </form>
  );
};

export default AddProductsForm;
