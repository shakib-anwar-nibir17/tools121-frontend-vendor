/* eslint-disable no-unused-vars */
import Select, { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={(e) => console.log("Selected Value ==>", props.label)}
        />{" "}
        <label className="text-black ms-2">{props.label}</label>
      </components.Option>
    </div>
  );
};

function MultiSelect({
  optionsData,
  setSelectedOptions,
  selectedOptions,
  register,
  errors,
}) {
  return (
    <div>
      <Select
        {...register("shop_categories")}
        options={optionsData}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={(selected) => setSelectedOptions(selected)}
        value={selectedOptions}
        // Hide dropdown list  when select any item
        // closeMenuOnSelect={true}

        //Selected Item Remove in dropdown list
        // hideSelectedOptions={true}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            paddingTop: "3px",
            paddingBottom: "3px",
            //   backgroundColor: '#DDDDDD'
            marginTop: "10px",
            border: "1px solid #E2E8F0",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "white",
            multiValue: "white",
          },
        })}
      />
      {errors.shop_categories && (
        <div className="text-red-500">{errors.shop_categories.message}</div>
      )}
    </div>
  );
}

export default MultiSelect;
