export type SodokuApiResponse = {
  data: {
    puzzle: string;
    solution: string;
    status: string;
    message: string;
  }[];
};
