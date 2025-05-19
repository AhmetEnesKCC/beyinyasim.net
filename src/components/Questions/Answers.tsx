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
      className={`cursor-pointer items-center border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg flex justify-between shadow-sm transition-all animate-fade-in ${
        selected
          ? "bg-main text-white hover:bg-main"
          : "bg-white/60 dark:bg-gray-700/40 hover:bg-white/80 dark:hover:bg-gray-700/60"
      }`}
      onClick={() => {
        toggleUserSelect(questionId, answer);
      }}
    >
      <p className="font-medium">{answer.title}</p>
      <div
        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
          selected ? "border-white" : "border-current"
        }`}
      >
        {selected && <div className="w-3 h-3 rounded-full bg-white" />}
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
