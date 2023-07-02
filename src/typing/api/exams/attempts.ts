import type { User } from "../auth/users";

import type { Exam } from "./exams";

export type Attempt = {
  id: string;

  userId: string;

  user?: User | null;

  exam: Exam;

  score: number;

  createdAt: Date;

  endedAt: Date;
};

export type UserAnswer = {
  questionId: string;

  answerId: string;
};
