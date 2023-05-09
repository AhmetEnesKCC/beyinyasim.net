import { StatusType } from "@/types/question";
import { FC } from "react";

const Status: FC<StatusType & { length: number }> = ({
  filled,
  step,
  length,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {step} / {length}
    </div>
  );
};
export default Status;
