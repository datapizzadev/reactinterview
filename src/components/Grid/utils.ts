export const gridToString = (grid: string[][]) => {
  return grid.toString().replaceAll(",", "").replaceAll("0", ".");
};

export const stringToGrid = (gridString: string) => {
  const gridToRet = [];
  const flatGrid = gridString.split("");

  for (let i = 0; i < flatGrid.length; i += 9) {
    gridToRet.push(flatGrid.slice(i, i + 9));
  }

  return gridToRet;
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
