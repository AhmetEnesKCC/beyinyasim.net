"use client";

import useQuestionStore from "@/state/useQuestionStore";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { FaTwitter } from "react-icons/fa";

const Finish = () => {
  const { questions, reset } = useQuestionStore();
  const router = useRouter();
  useEffect(() => {
    if (questions.length === 0) {
      router.push("/");
    }
  }, [questions]);
  const result = useMemo(() => {
    let sumArr = questions.map((q) => q.selection?.weight) ?? [];
    let sum = 0;
    let min = 0;
    let max = 1;
    if (sumArr.length) {
      sum = sumArr.reduce((a, b) => a! + b!) ?? 0;
    }

    let minArray = questions.map((q) =>
      Math.min(...q.answers.map((a) => a.weight))
    );

    let maxArray = questions.map((q) =>
      Math.max(...q.answers.map((a) => a.weight))
    );

    if (minArray.length) {
      min = minArray.reduce((a, b) => a! + b!);
    }
    if (maxArray.length) {
      max = maxArray.reduce((a, b) => a! + b!);
    }

    return Math.max(
      Math.floor((((sum ?? min) - min) / (max - min)) * 87 + 3),
      3
    );
  }, [questions]);

  const handleRestart = () => {
    reset();
    router.push("/");
  };

  return (
    <div
      className="max-w-xl w-full flex flex-col items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-xl px-6 py-8 mx-auto mt-12 rounded-2xl transition-all animate-fade-in"
    >
      <h3 className="mb-4 text-lg font-semibold">Beyin Yaşın</h3>
      <h4 className="text-5xl text-main font-extrabold">
        {isNaN(result) ? "" : result}
      </h4>
      <button
        onClick={() => handleRestart()}
        className="mt-12 bg-gradient-to-r from-main to-green-600 text-white px-4 py-2 rounded-full font-semibold hover:brightness-110"
      >
        Tekrar Çöz
      </button>
      <a
        target="_blank"
        href={`http://twitter.com/share?text=${
          "benim beyin yaşım " + result
        }&url=https://beyinyasim.net &hashtags=beyinyasim`}
        className="mt-6 p-3 cursor-pointer rounded-full bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700 transition-all"
      >
        <FaTwitter className="text-main" size={24} />
      </a>
    </div>
  );
};

export default Finish;
