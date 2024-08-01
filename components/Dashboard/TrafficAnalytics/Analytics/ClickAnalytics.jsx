"use client";
import { RxDotsHorizontal } from "react-icons/rx";
import ClickChart from "../AnalyticCharts/ClickChart";

const ClickAnalytics = () => {
  return (
    <div className="w-full h-full rounded-2xl shadow-lg p-6">
      <p className="flex justify-between my-3 text-2xl text-black px-6">
        <span className="flex gap-3 items-center">Returning Visitor</span>
        <span className="flex items-center gap-5">
          3K <RxDotsHorizontal />
        </span>
      </p>
      <ClickChart />
    </div>
  );
};

export default ClickAnalytics;
