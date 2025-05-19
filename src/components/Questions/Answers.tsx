"use client";

import useQuestionStore from "@/state/useQuestionStore";
import { AnswerType } from "@/types/question";
import { FC, useEffect } from "react";

const Answer: FC<
  { answer: AnswerType } & {
    selected: boolean;
    questionId: string | null;
  }
> = ({ answer, selected, questionId }) => {
  const { toggleUserSelect } = useQuestionStore();

  return (
    <div
      className={` bg-white dark:bg-gray-700 hover:bg-[#F8F8F8] dark:hover:bg-gray-600 items-center border-black dark:border-gray-400 border-[1px] px-4 py-2 rounded-sm flex justify-between transition-colors animate-fade-in ${
        selected ? "!bg-main !text-white" : ""
      }`}
      onClick={() => {
        toggleUserSelect(questionId, answer);
      }}
    >
      <p>{answer.title}</p>
      <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white dark:bg-gray-800 border-2">
        <div
          className={`w-[16px] h-[16px] rounded-full ${
            selected ? "bg-main" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

const Answers: FC<{
  answers: AnswerType[];
  selected: AnswerType | null;
  questionId: string | null;
}> = ({ answers, selected, questionId }) => {
  return (
    <div className="flex flex-col gap-y-8">
      {answers?.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          questionId={questionId}
          selected={selected?.id === answer.id}
        />
      ))}
    </div>
  );
};

export default Answers;
