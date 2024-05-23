import { Progress } from "@/components/ui/progress";

const StarProgress = ({ value, type }) => {
  return (
    <div className="flex gap-4 mb-4">
      <p className="text-primary-900">{type} star</p>
      <Progress
        className="w-[216px] h-6  border border-slate-200"
        value={value}
      />
      <p>{value}%</p>
    </div>
  );
};

export default StarProgress;
