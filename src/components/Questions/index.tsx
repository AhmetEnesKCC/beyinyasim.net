"use client";

import useQuestionStore from "@/state/useQuestionStore";
import Status from "./Status";

import { useEffect, useMemo } from "react";

import qData from "@/data/mock.json";
import Question from "./Question";
import Answers from "./Answers";
import { nanoid } from "nanoid";
import Button, {
  BackButton,
  FinishButton,
  LastButton,
  NextButton,
} from "./Buttons";
import RenderIf from "../RenderIf";

const Wrapper = () => {
  const { questions, status, setQuestions } = useQuestionStore();

  useEffect(() => {
    setQuestions(
      qData.map((qD) => ({
        ...qD,
        selection: null,
        id: nanoid(),
        answers: qD.answers.map((ans) => ({ ...ans, id: nanoid() })),
      }))
    );
  }, []);

  const currentQuestion = useMemo(() => {
    return questions[status.step - 1];
  }, [status, questions]);

  return (
    <div className="shadow-md w-[80vw] flex flex-col bg-white px-3 py-4">
      <Status length={questions.length} {...status} />
      <Question title={currentQuestion?.title} />
      <div className="flex gap-x-2 justify-between my-6">
        <RenderIf condition={status.step > 1}>
          <BackButton />
        </RenderIf>
        <RenderIf condition={status.step !== questions.length}>
          <NextButton disabled={Boolean(!currentQuestion?.selection)} />
        </RenderIf>
        <RenderIf condition={status.step === questions.length}>
          <FinishButton disabled={Boolean(!currentQuestion?.selection)} />
        </RenderIf>
        <RenderIf condition={status.filled === questions.length}>
          <LastButton />
        </RenderIf>
      </div>
      <Answers
        questionId={currentQuestion?.id}
        answers={currentQuestion?.answers}
        selected={currentQuestion?.selection}
      />
    </div>
  );
};

export default Wrapper;
