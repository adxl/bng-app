export type CreateExamDto = {
  duration: number;

  typeId: string;
};

export type UpdateExamDto = {
  duration?: number;

  typeId?: string;
};
