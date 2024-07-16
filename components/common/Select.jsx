import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOptions = ({ placeholder , options, onChangHandler, defaultValue}) => {
  return (
      <select
      onChange={(e) => onChangHandler(e.target.value)}
      defaultValue={defaultValue}
      className="px-2 border border-1 border-gray-400 rounded-md py-2">
         {/* <option>{placeholder}</option> */}
          {
            options?.map((item) => (
              <option key={item?.value} value={item?.value}>{item?.label}</option>
            ))
          }
      </select>
  );
};

export default SelectOptions;
