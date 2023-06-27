export type CreateAnswerDto = {
  title: string;

  isCorrect: boolean;

  questionId: string;
};

export type UpdateAnswerDto = {
  title?: string;

  isCorrect?: boolean;
};
