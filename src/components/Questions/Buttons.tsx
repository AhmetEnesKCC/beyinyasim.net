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
      className={`flex-1 font-semibold py-3 px-5 rounded-full transition-all shadow-md bg-gradient-to-r from-main to-green-600 text-white hover:brightness-110 ${
        disabled ? "!bg-gray-300 !text-gray-500 hover:brightness-100" : ""
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
