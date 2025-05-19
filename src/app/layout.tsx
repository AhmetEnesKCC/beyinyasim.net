"use client";

import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import useQuestionStore from "@/state/useQuestionStore";
import useThemeStore from "@/state/useThemeStore";
import { nanoid } from "nanoid";

import qData from "@/data/mock.json";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setQuestions } = useQuestionStore();
  const { theme, setTheme } = useThemeStore();
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

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white transition-colors min-h-screen`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
