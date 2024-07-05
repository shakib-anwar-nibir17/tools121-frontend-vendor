import React from 'react'
import { Controller } from 'react-hook-form';

const SingleSelect = ({control, name, data, defaultVal, triggerFunction = false}) => {
    const token = localStorage.getItem("vendorToken");

  return (
    <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <select
      {...field}
        className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
        // type="text"
       defaultValue={defaultVal}
      onChange={(e) => {
        field.onChange(e); // call the react-hook-form onChange
        if(triggerFunction){
            triggerFunction({cat_id: e.target?.value, token})
        }
      }}
      >
        <option className="text-primary-950">Select {name}</option>
        {
          data?.map((item) => (
            <option key={item?.id} value={item?.id} className="text-primary-950">{
                item?.category_name || item?.sub_category_name
            }</option>
          ))
        }
      </select>
    )}
    />
  )
}

export default SingleSelect;