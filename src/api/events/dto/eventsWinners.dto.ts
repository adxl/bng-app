export type UpdateEventWinnersDto = {
  winners: Array<{
    userId: string;
    rank: number;
  }>;
};
