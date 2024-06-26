'use client'
import { Button } from "@/components/ui/button";
import MultiSelect from "./MultiSelect";
import { useState } from "react";

const ShopInfoForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const optionsData = [
    { value: 'internationalTravel', label: 'International Travel' },
    { value: 'sustainableLiving', label: 'Sustainable Living' },
    { value: 'innovativeSolutions', label: 'Innovative Solutions' },
    { value: 'artificialIntelligence', label: 'Artificial Intelligence' },
    { value: 'climateChangeAction', label: 'Climate Change Action' },
    { value: 'renewableResources', label: 'Renewable Resources' },
    { value: 'healthcareInnovations', label: 'Healthcare Innovations' },
    { value: 'educationalReforms', label: 'Educational Reforms' },
    { value: 'digitalTransformation', label: 'Digital Transformation' },
    { value: 'cybersecurityMeasures', label: 'cybersecurityMeasures'},
    { value: 'cybersecurityMeasures cybersecurityMeasures cybersecurityMeasures' , label: 'cybersecurityMeasures cybersecurityMeasures cybersecurityMeasures'},

    ]  
console.log("selected Options ==>", selectedOptions)
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
          <MultiSelect selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} optionsData={optionsData}/>
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
