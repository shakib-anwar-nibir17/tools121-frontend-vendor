import React from 'react'
import { Controller } from 'react-hook-form';
// import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';


const SingleSelect = ({control, name, data, defaultVal, triggerFunction, placeHolderName, errorMessage = '', bgPrimary = true, resetField}) => {
    const token = localStorage.getItem("vendorToken");

  return (
    <div>
 <Controller
    name={name}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <Select
        {...field}
        isSearchable={true}
         onChange={(selectedOption) => {
            field.onChange(selectedOption)
            if(name == 'category' && selectedOption){
                triggerFunction({cat_id: selectedOption?.value, token})
                resetField("sub_category")
            }
            else if(name == 'sub_category' && selectedOption){
              triggerFunction({sub_cat_id:  selectedOption?.value, token})
              resetField("product_id")
            }
        }}
         styles={{  control: (provided) => ({
            ...provided,
            backgroundColor: bgPrimary ? '#e2eeff' : 'white', // Change the background color of the control
            marginTop: '10px'
          }),}}
          placeholder={`Search Or Select ${placeHolderName}`}
         isClearable options={data} 
         />
    )}
    />
      {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}
    </div>
   
  )
}

export default SingleSelect;