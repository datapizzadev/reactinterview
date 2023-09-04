import { useState } from 'react';
import './App.css'

const App = () => {

  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));

  const updateGrid = (guess: number, rowIndex: number, colIndex: number) => {
    setGrid((preGrid) => {
      const newGrid = [...preGrid];
      newGrid[rowIndex][colIndex] = guess;
      return newGrid
    })
  }

  const solveGrid = () => {
    return undefined;
  }

  const gridToString = () => {
    return grid.toString().replaceAll(",", "").replaceAll("0", ".");
  }

  const clearGrid = () => {
    setGrid(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));
  }

  console.log(gridToString());

  return (
    <div className='w-full h-full flex flex-shrink justify-center items-center flex-col gap-4'>
      <div className='aspect-square grid grid-cols-9 gap-2'>
        {
          grid.map((row, i) =>
            row.map((cell, j) =>
              <div className='flex flex-shrink justify-center items-center relative bg-white' key={i + j}>
                <input min={1} max={9} className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-full text-6xl text-center' type="number" value={cell} onChange={(e) => updateGrid(+e.target.value, i, j)} />
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
