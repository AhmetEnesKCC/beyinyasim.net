import { AnswerType, QuestionType, StatusType } from "@/types/question";
import { create } from "zustand";

export interface QuestionsState {
  questions: QuestionType[];
  status: StatusType;
  setQuestions: (questions: QuestionType[]) => void;
  setStep: (to: "increase" | "decrease" | "last") => void;
  toggleUserSelect: (questionId: string | null, answer: AnswerType) => void;
  addFilled: () => void;
  reset: () => void;
}

const useQuestionStore = create<QuestionsState>()((set) => ({
  questions: [],
  status: {
    filled: 0,
    step: 1,
  },
  userSelections: [],
  toggleUserSelect: (questionId, answer) =>
    set((state) => {
      state.questions = state.questions.map((s) => ({
        ...s,
        ...(s.id === questionId ? { selection: answer } : {}),
      }));
      return {
        ...state,
        questions: state.questions.map((q) => ({
          ...q,
          ...(q.id === questionId ? { selection: answer } : {}),
        })),
      };
    }),

  setQuestions: (questions: QuestionType[]) =>
    set((state) => ({ ...state, questions })),
  setStep: (to) => {
    set((state) => {
      let step = state.status.step;
      if (to === "decrease" && step > 1) {
        step--;
      }
      if (to === "increase" && step < state.questions.length) {
        step++;
      }
      if (to === "last") {
        step = state.questions.length;
      }

      return { ...state, status: { ...state.status, step: step } };
    });
  },
  addFilled: () =>
    set((state) => {
      state.status.filled++;
      return state;
    }),
  reset: () =>
    set((state) => {
      return {
        ...state,
        questions: state.questions.map((q) => ({ ...q, selection: null })),
        status: {
          step: 1,
          filled: 0,
        },
      };
    }),
}));

export default useQuestionStore;
