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

  const gridToString = () => {
    return grid.toString().replaceAll(",", "").replaceAll("0", ".");
  }

  const clearGrid = () => {
    setGrid(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));
  }

  console.log(gridToString());

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <div className='aspect-square max-w-full max-h-full  grid grid-cols-9 gap-4'>
        {
          grid.map((row, i) =>
            row.map((cell, j) =>
              <div className='flex justify-center items-center aspect-square p-2 w-fit h-fit text-center' key={i + j}>
                <input className='text-5xl w-full h-full text-center' type="number" value={cell} onChange={(e) => updateGrid(+e.target.value, i, j)} />
              </div>
            )
          )
        }
      </div>
      <button onClick={clearGrid}>
        Clear
      </button>
    </div>


  )
}

export default App;
