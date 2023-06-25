import type { Question } from "./questions";

export type Answer = {
  id: string;

  question?: Question;

  title: string;

  isCorrect: boolean;
};
