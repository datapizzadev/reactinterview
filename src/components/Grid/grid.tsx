import { useState } from "react";
import { gridToString, stringToGrid } from "./utils";
import Cell from "./cell";

const Grid = () => {
    const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "0")));

    const guessCell = (guess: string, rowIndex: number, colIndex: number) => {
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

    const solveGrid = async () => {
        const solutionString = await fetchGridSolution();
        const solutionGrid = stringToGrid(solutionString)
        console.log("GRID SOLUTION", solutionGrid);

        setGrid(solutionGrid)
    }

    const clearGrid = () => {
        setGrid(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "0")));
    }

    return (
        <div className='w-full h-full flex flex-shrink justify-center items-center flex-col gap-4'>
            <div className='aspect-square grid grid-cols-9 gap-2'>
                {
                    grid.map((row, i) =>
                        row.map((cell, j) =>
                            <Cell key={i + j} value={cell} onUpdate={({ guess }) => guessCell(guess, i, j)} />
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


export default Grid;