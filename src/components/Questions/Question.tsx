import useQuestionStore from "@/state/useQuestionStore";
import { QuestionTitleType, QuestionType } from "@/types/question";
import { FC, useMemo } from "react";

const Question: FC<{ title: QuestionTitleType }> = ({ title }) => {
  return <div className="mb-6 mt-4 font-mono text-xl">{title}</div>;
};

export default Question;
