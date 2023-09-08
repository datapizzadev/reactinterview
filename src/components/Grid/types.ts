export type ErrInfo = {
  errValue: string;
  where: "row" | "col";
  index: number;
};

export type NetworkError = {
  type: "network";
  message: string;
};

export type ApiError = {
  type: "api";
  message: string;
};

export type GridError = NetworkError | ApiError;

export type PrettyApiError = {
  message: string;
  info: ErrInfo;
  type: "api";
};

export type PrettyNetError = {
  message: string;
  info: string;
  type: "network";
};

export type GridState = {
  grid: string[][];
  prettyError: PrettyApiError | PrettyNetError | null;
};

export type GuessAction = {
  type: "guess_cell";
  guess: {
    value: string;
    rowIndex: number;
    colIndex: number;
  };
};

export type ClearAction = {
  type: "clear_grid";
};

export type ErrorAction = {
  type: "set_error";
  error: GridError;
};

export type SetGridAction = {
  type: "set_grid";
  grid: string[][];
};
