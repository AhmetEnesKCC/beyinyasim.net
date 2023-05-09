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
    <div className="shadow-md w-[60vw] flex flex-col items-center bg-white px-3 py-4 mx-auto mt-12">
      <h3 className="mb-8">Beyin Yaşın</h3>
      <h4 className="text-4xl text-main font-bold">
        {isNaN(result) ? "" : result}
      </h4>
      <button
        onClick={() => handleRestart()}
        className="mt-12 bg-main bg-opacity-10 text-main px-3 py-2 rounded-md hover:brightness-110"
      >
        Tekrar Çöz
      </button>
      <a
        target="_blank"
        href={`http://twitter.com/share?text=${
          "benim beyin yaşım " + result
        }&url=https://beyinyasim.net &hashtags=beyinyasim`}
        className="mt-6 bg-transparent px-4 py-3 cursor-pointer hover:bg-main hover:bg-opacity-10 rounded-md"
      >
        <FaTwitter className="text-main hover:scale-105 " size={24} />
      </a>
    </div>
  );
};

export default Finish;
