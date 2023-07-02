export type CreateAnswerDto = {
  title: string;

  isCorrect: boolean;

  question: {
    id: string;
  };
};

export type UpdateAnswerDto = {
  title?: string;

  isCorrect?: boolean;
};
