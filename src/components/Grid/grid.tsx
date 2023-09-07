import { FormEvent, useReducer } from "react";
import { fetchGridSolution, stringToGrid } from "./utils";
import Cell from "./cell";
import useFetch from "../../hooks/useFetch";
import { SodokuApiResponse } from "../../types/responses";

// TODO: 1. Handle response error

type GridState = {
    grid: string[][],
    prettyError: string | null
}

type GuessAction = {
    type: "guess_cell"
    guess: {
        value: string,
        rowIndex: number,
        colIndex: number
    },
}

type ClearAction = {
    type: "clear_grid"
}

type ErrorAction = {
    type: "set_error",
    error: string
}

type SetGridAction = {
    type: "set_grid",
    grid: string[][]
}

type Action = GuessAction | ClearAction | SetGridAction | ErrorAction

const createInitialState = () => {
    return {
        grid: Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "")),
        prettyError: null,
    }
}

const reducer = (state: GridState, action: Action) => {
    switch (action.type) {
        case "guess_cell": {
            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(action.guess.value)) {
                return state;
            }
            const g = [...state.grid];
            g[action.guess.rowIndex][action.guess.colIndex] = action.guess.value;
            return {
                grid: g,
                prettyError: null
            }
        }
        case "clear_grid": {
            return createInitialState()
        }
        case "set_grid": {
            return {
                grid: [...action.grid],
                prettyError: null
            }
        }
        case "set_error": {
            return {
                ...state,
                prettyError: action.error
            }
        }
    }

}

const Grid = () => {
    const [state, dispatch] = useReducer(reducer, null, createInitialState)

    const solutionQuery = useFetch<SodokuApiResponse>({
        fetchFn: async () => fetchGridSolution(state.grid)
    })

    const guessCell = (guess: string, rowIndex: number, colIndex: number) => {
        dispatch({
            type: "guess_cell",
            guess: {
                value: guess,
                rowIndex: rowIndex,
                colIndex: colIndex
            }
        })
    }

    const clearGrid = () => {
        dispatch({ type: "clear_grid" });
    }

    const submitGrid = async (e: FormEvent) => {
        e.preventDefault();
        if (solutionQuery.status === "loading") return;
        await solveGrid();
    }

    const solveGrid = async () => {
        const { resData, error } = await solutionQuery.runFetch(null);

        if (!resData) {
            // If resData is null then there probably was a network error
            console.log(error!.message);

            dispatch({ type: "set_error", error: error!.message || error!.name })
            return;
        }

        if (resData.data[0].status === "error") {
            // If resData status is error then the api sent back a custom error
            dispatch({ type: "set_error", error: resData.data[0].message })
            return;
        }

        console.log(resData.data[0]);

        const solutionString = resData.data[0].solution;
        const solutionGrid = stringToGrid(solutionString)
        console.log("GRID SOLUTION", solutionGrid);

        dispatch({ type: "set_grid", grid: solutionGrid })
    }

    return (
        <form onSubmit={submitGrid} className="w-full h-full flex justify-center items-center flex-col gap-4">
            <div className='min-h-0 w-full max-w-screen-sm aspect-square grid grid-cols-9'>
                {
                    state.grid.map((row, i) =>
                        row.map((cell, j) =>
                            <Cell row={i} col={j} key={i + j} value={cell} onUpdate={({ guess }) => guessCell(guess, i, j)} />
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
        </form>
        // {
        //     state.prettyError ? <div className="bg-red-500 flex flex-col gap-2 w-fit px-6 rounded-md items-start">
        //         <h1 className="text-red-950">
        //             Error
        //         </h1>
        //         <h2>
        //             {state.prettyError}
        //         </h2>
        //     </div> : null
        // }
    )
}


export default Grid;