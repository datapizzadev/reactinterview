import { ApiError, ErrInfo } from "./types";

export const gridToString = (grid: string[][]) => {
  let gridStr = "";
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "") gridStr += ".";
      else gridStr += cell;
    });
  });
  return gridStr;
};

export const stringToGrid = (gridString: string) => {
  const gridToRet = [];
  const flatGrid = gridString.split("");

  for (let i = 0; i < flatGrid.length; i += 9) {
    gridToRet.push(flatGrid.slice(i, i + 9));
  }

  return gridToRet;
};

export const fromErrorToInfo = (error: ApiError): ErrInfo => {
  const values = error.message.split(" ");
  const number = values[0];
  const colRow = values[4];
  const colRowIndx = values[5];

  return {
    errValue: number,
    where: colRow as "row" | "col",
    index: +colRowIndx - 1,
  };
};

export const fetchGridSolution = (grid: string[][]) => {
  return fetch(import.meta.env.VITE_SUDOKU_API_URL, {
    method: "POST",
    body: JSON.stringify({ sudoku: [gridToString(grid)] }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
