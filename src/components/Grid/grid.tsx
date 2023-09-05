import { FormEvent, useState } from "react";
import { fetchGridSolution, stringToGrid } from "./utils";
import Cell from "./cell";
import useFetch from "../../hooks/useFetch";
import { SodokuApiResponse } from "../../types/responses";

const Grid = () => {
    const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "0")));

    const solutionQuery = useFetch<SodokuApiResponse>({
        fetchFn: async () => fetchGridSolution(grid)
    })

    const guessCell = (guess: string, rowIndex: number, colIndex: number) => {
        setGrid((preGrid) => {
            const newGrid = [...preGrid];
            newGrid[rowIndex][colIndex] = guess;
            return newGrid
        })
    }

    const clearGrid = () => {
        setGrid(Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "0")));
    }

    const submitGrid = async (e: FormEvent) => {
        e.preventDefault();
        if (solutionQuery.status === "loading") return;
        await solveGrid();
    }

    const solveGrid = async () => {
        const { data } = await solutionQuery.runFetch(null);

        console.log(data);

        const solutionString = data[0].solution;
        const solutionGrid = stringToGrid(solutionString)
        console.log("GRID SOLUTION", solutionGrid);

        setGrid(solutionGrid)
    }

    return (
        <form onSubmit={submitGrid}>
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
                    <button type="button" onClick={clearGrid} disabled={solutionQuery.status === "loading"}>
                        Clear
                    </button>
                    <button type="submit" disabled={solutionQuery.status === "loading"}>
                        Solve
                    </button>
                </div>
            </div>
        </form>
    )
}


export default Grid;