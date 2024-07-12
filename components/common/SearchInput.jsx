"use client";
import { IoSearchOutline } from "react-icons/io5";
const SearchInput = ({ onSearchHandler }) => {
  return (
    <div className="h-10 border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between w-full">
      <input
        type="text"
        className="border-none px-4 focus:outline-none w-full"
        placeholder="search product..."
        onChange={(e) => onSearchHandler(e.target.value)}
      />
      <IoSearchOutline />
    </div>
  );
};

export default SearchInput;
