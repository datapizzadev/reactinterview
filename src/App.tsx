import { useState } from 'react';
import './App.css'

const App = () => {

  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));

  const guessCell = (guess: number, rowIndex: number, colIndex: number) => {
    setGrid((preGrid) => {
      const newGrid = [...preGrid];
      newGrid[rowIndex][colIndex] = guess;
      return newGrid
    })
  }

  const fetchGridSolution = async () => {
    const res = await fetch("http://0.0.0.0:8080/http://0.0.0.0:5000/", {
      method: "POST",
      body: JSON.stringify({ sudoku: [gridToString(grid)] }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();

    return data[0].solution;
  }

  const gridToString = (grid: number[][]) => {
    return grid.toString().replaceAll(",", "").replaceAll("0", ".");
  }

  const stringToGrid = (gridString: string) => {
    const gridToRet = []
    const flatInNumber = gridString.split("").map((c) => +c);

    let start = 0;

    while (start < flatInNumber.length) {
      gridToRet.push(flatInNumber.slice(start, start + 9));
      start += 9;
    }

    return gridToRet;
  }


  const solveGrid = async () => {
    const solutionString = await fetchGridSolution();
    const solutionGrid = stringToGrid(solutionString)
    console.log("GRID SOLUTION", solutionGrid);

    setGrid(solutionGrid)
  }

  const clearGrid = () => {
    setGrid(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));
  }

  return (
    <div className='w-full h-full flex flex-shrink justify-center items-center flex-col gap-4'>
      <div className='aspect-square grid grid-cols-9 gap-2'>
        {
          grid.map((row, i) =>
            row.map((cell, j) =>
              <div className='flex flex-shrink justify-center items-center relative bg-white' key={i + j}>
                <input min={1} max={9} className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-full text-6xl text-center' type="number" value={cell} onChange={(e) => guessCell(+e.target.value, i, j)} />
              </div>
            )
          )
        }
      </div>
      <div className='flex w-full h-fit justify-center items-center gap-4'>
        <button onClick={clearGrid}>
          Clear
        </button>
        <button onClick={solveGrid}>
          Solve
        </button>
      </div>
    </div>
  )
}

export default App;
