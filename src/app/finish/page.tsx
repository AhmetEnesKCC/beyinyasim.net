"use client";

import useQuestionStore from "@/state/useQuestionStore";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Finish = () => {
  const { questions, reset } = useQuestionStore();
  const router = useRouter();
  useEffect(() => {
    if (questions.length === 0) {
      router.push("/");
    }
  }, [questions]);
  const result = useMemo(() => {
    const length = questions.length;
    let sumArr = questions.map((q) => q.selection?.weight) ?? [];
    let sum = 0;
    if (sumArr.length) {
      sum = sumArr.reduce((a, b) => a! + b!) ?? 0;
    }

    const min =
      Math.min(
        ...questions.map((q) => Math.min(...q.answers.map((a) => a.weight)))
      ) * length;
    const max =
      Math.max(
        ...questions.map((q) => Math.max(...q.answers.map((a) => a.weight)))
      ) * length;
    return Math.max(
      Math.floor((((sum ?? min) - min) / (max - min)) * 87 + 3),
      3
    );
  }, [questions]);

  const handleRestart = () => {
    reset();
  };
  return (
    <div className="shadow-md w-[60vw] flex flex-col items-center bg-white px-3 py-4 mx-auto mt-12">
      <h3 className="mb-8">Beyin Yaşın</h3>
      <h4 className="text-4xl text-main font-bold">{result}</h4>
      <button
        onClick={() => handleRestart}
        className="mt-12 bg-main bg-opacity-10 text-main px-3 py-2 rounded-md hover:brightness-110"
      >
        Tekrar Çöz
      </button>
    </div>
  );
};

export default Finish;
