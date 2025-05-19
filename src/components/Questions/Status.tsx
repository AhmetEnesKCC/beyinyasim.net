import { StatusType } from "@/types/question";
import { FC } from "react";

const Status: FC<StatusType & { length: number }> = ({
  filled,
  step,
  length,
}) => {
  const progress = Math.round((step / length) * 100);
  return (
    <div className="flex items-center w-full mb-4 space-x-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-main transition-all"
        ></div>
      </div>
      <span className="text-sm font-medium">
        {step} / {length}
      </span>
    </div>
  );
};
export default Status;
