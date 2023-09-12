import { FormEvent, useReducer } from "react";
import { fetchGridSolution, fromErrorToInfo, stringToGrid } from "./utils";
import Cell from "./cell";
import useFetch from "../../hooks/useFetch";
import { SodokuApiResponse } from "../../types/responses";
import { GuessAction, ClearAction, SetGridAction, ErrorAction, GridState } from "./types";



type Action = GuessAction | ClearAction | SetGridAction | ErrorAction

const createInitialState = () => {
    return {
        grid: Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => "")),
        prettyError: null
    }
}

const reducer = (state: GridState, action: Action) => {
    switch (action.type) {
        case "guess_cell": {
            // Check if input value is allowed
            if (!["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(action.guess.value)) {
                return state;
            }

            // Update grid cell
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
            if (action.error.type === "api") {
                const errInfo = fromErrorToInfo(action.error)
                return {
                    ...state,
                    prettyError: {
                        message: action.error.message,
                        info: errInfo,
                        type: action.error.type
                    }
                }
            }
            return {
                ...state,
                prettyError: {
                    message: action.error.message,
                    info: action.error.message,
                    type: action.error.type
                }
            }
        }
    }

}

const Grid = () => {
    const [state, dispatch] = useReducer(reducer, null, createInitialState)

    const solutionQuery = useFetch<SodokuApiResponse>({
        fetchFn: () => fetchGridSolution(state.grid)
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

            dispatch({ type: "set_error", error: { type: "network", message: error?.message || error?.name || "Network error" } })
            return;
        }

        if (resData.data[0].status === "error") {
            // If resData status is error then the api sent back a custom error
            dispatch({ type: "set_error", error: { type: "api", message: resData.data[0].message } })
            return;
        }

        console.log(resData.data[0]);

        const solutionString = resData.data[0].solution;
        const solutionGrid = stringToGrid(solutionString)
        console.log("GRID SOLUTION", solutionGrid);

        dispatch({ type: "set_grid", grid: solutionGrid })
    }

    return (
        <form onSubmit={submitGrid} className="relative w-full h-full flex justify-center items-center flex-col gap-6">
            <h1 className="[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:black]">
                <span className="text-red-600">S</span>
                <span className="text-orange-600">U</span>
                <span className="text-yellow-600">D</span>
                <span className="text-green-600">O</span>
                <span className="text-blue-500">K</span>
                <span className="text-purple-600">U</span>
            </h1>
            {
                state.prettyError ? <div className="z-10 absolute top-0 left-0 bg-poppy outline outline-2 -rotate-6 outline-black shadow-card flex flex-col gap-2 w-fit p-6 items-start">
                    <h1 className="text-black lg:text-2xl  md:text-xl sm:text-lg text-lg">
                        OOOPS :(
                    </h1>
                    <h2 className="text-black lg:text-xl  md:text-l sm:text-sm break-before-all text-sm">
                        {state.prettyError.message.toUpperCase()}
                    </h2>
                </div> : null
            }
            <div className='max-w-screen-lg max-h-full aspect-square grid grid-cols-9'>
                {
                    state.grid.map((row, i) =>
                        row.map((cell, j) =>
                            <Cell errInfo={state.prettyError && state.prettyError.type === "api" ? state.prettyError.info : null}
                                row={i} col={j} key={i + j} value={cell}
                                onUpdate={({ guess }) => guessCell(guess, i, j)} />
                        )
                    )
                }
            </div>

            <div className=' flex w-full h-fit justify-center items-center gap-4'>
                <button className="border-0 px-10 py-2 text-black bg-transparent rounded-none outline outline-transparent hover:bg-white hover:border-0 hover:outline-black" type="button" onClick={clearGrid} disabled={solutionQuery.status === "loading"}>
                    CLEAR
                </button>
                <button className="hover:bg-flash-darken border-0 px-10 py-2 text-black bg-flash-normal rounded-none outline shadow-button  outline-black" type="submit" disabled={solutionQuery.status === "loading"}>
                    SOLVE
                </button>
            </div>


        </form>

    )
}


export default Grid;