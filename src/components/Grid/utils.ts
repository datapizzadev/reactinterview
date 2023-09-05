export const gridToString = (grid: string[][]) => {
  return grid.toString().replaceAll(",", "").replaceAll("0", ".");
};

export const stringToGrid = (gridString: string) => {
  const gridToRet = [];
  const flatInNumber = gridString.split("");

  let start = 0;

  while (start < flatInNumber.length) {
    gridToRet.push(flatInNumber.slice(start, start + 9));
    start += 9;
  }

  return gridToRet;
};
