export interface AnswerType {
  title: string;
  weight: number;
  id: string;
}

export type QuestionTitleType = string;

export interface QuestionType {
  title: QuestionTitleType;
  answers: AnswerType[];
  id: string;
  selection: AnswerType | null;
}

export interface StatusType {
  step: number;
  filled: number;
}
