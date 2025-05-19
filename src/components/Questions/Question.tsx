import useQuestionStore from "@/state/useQuestionStore";
import { QuestionTitleType, QuestionType } from "@/types/question";
import { FC, useMemo } from "react";

const Question: FC<{ title: QuestionTitleType }> = ({ title }) => {
  return <h2 className="mb-8 mt-4 text-2xl font-semibold">{title}</h2>;
};

export default Question;
