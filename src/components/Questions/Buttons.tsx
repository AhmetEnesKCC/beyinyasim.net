"use client";

import useQuestionStore from "@/state/useQuestionStore";
import { useRouter } from "next/navigation";
import React, { FC, PropsWithChildren, ReactElement, useEffect } from "react";

type ButtonsType = React.FunctionComponent<
  PropsWithChildren<{
    label: string;
    type: "back" | "next" | "finish" | "last";
    disabled?: boolean;
  }>
> & {
  Back?: React.FunctionComponent;
  Next?: React.FunctionComponent;
  Finish?: React.FunctionComponent;
  Last?: React.FunctionComponent;
};

const Button: ButtonsType = ({ label, type, disabled }) => {
  const { setStep } = useQuestionStore();

  const router = useRouter();

  const handleClick = () => {
    switch (type) {
      case "back":
        return setStep("decrease");
      case "next":
        return setStep("increase");
      case "last":
        return setStep("last");
      case "finish":
        router.push("/finish");
    }
  };

  return (
    <button
      disabled={disabled ? disabled : false}
      className={`flex-1 hover:bg-opacity-20 bg-main bg-opacity-5 dark:bg-opacity-10 font-bold text-main py-3 px-2 rounded transition-colors ${
        disabled ? "!bg-slate-100 !text-black" : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export const BackButton = () => {
  return <Button label="Önceki" type="back" />;
};

export const NextButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  return <Button disabled={disabled} label="Sonraki" type="next" />;
};

export const FinishButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  return <Button disabled={disabled} label="Bitir" type="finish" />;
};

export const LastButton = () => {
  return <Button label="Sona Git" type="last" />;
};

export default Button;
