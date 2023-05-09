"use client";

import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import useQuestionStore from "@/state/useQuestionStore";
import { nanoid } from "nanoid";

import qData from "@/data/mock.json";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setQuestions } = useQuestionStore();
  useEffect(() => {
    document.title = "beyinyasim.net";
    if (localStorage.getItem("user-state") !== null) {
      const prev = JSON.parse(localStorage.getItem("user-state")!);
      useQuestionStore.setState({
        questions: prev?.questions,
        status: prev.status,
      });
    } else {
      setQuestions(
        qData.map((qD) => ({
          ...qD,
          selection: null,
          id: nanoid(),
          answers: qD.answers.map((ans) => ({ ...ans, id: nanoid() })),
        }))
      );
    }
    const unsubFromStore = useQuestionStore.subscribe(() => {
      localStorage.setItem(
        "user-state",
        JSON.stringify({
          questions: useQuestionStore.getState().questions,
          status: useQuestionStore.getState().status,
        })
      );
    });
    return () => unsubFromStore();
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
