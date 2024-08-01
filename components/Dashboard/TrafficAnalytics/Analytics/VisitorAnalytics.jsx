import { Progress } from "@/components/ui/progress";
import { BiSolidCheckbox } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";

const VisitorAnalytics = () => {
  return (
    <div className="w-[360px] h-[425px] rounded-2xl shadow-lg px-6 py-10">
      <p className="w-full flex justify-between text-xl text-black">
        <span>Visitor by User Type</span>
        <span>
          <RxDotsHorizontal />
        </span>
      </p>
      <div className="h-[150px] flex w-full justify-center items-center my-8 gap-10">
        <Progress value={80} vertical={true} />
        <Progress value={30} vertical={true} fill="#2EBF43" />
      </div>
      <div>
        <p className="flex justify-between mb-3">
          <span className="flex gap-3 items-center">
            <BiSolidCheckbox fill="#0d6efd" /> New Visitor
          </span>
          <span>3K</span>
        </p>
        <hr />
        <p className="flex justify-between my-3">
          <span className="flex gap-3 items-center">
            <BiSolidCheckbox fill="#2EBF43" /> Returning Visitor
          </span>
          <span>3K</span>
        </p>
        <hr />
      </div>
    </div>
  );
};

export default VisitorAnalytics;
