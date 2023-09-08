import { useEffect, useState } from "react";
import { ErrInfo } from "./types";


interface CellProps {
    value: string,
    onUpdate: ({ guess }: { guess: string }) => void
    row: number,
    col: number,
    errInfo: ErrInfo | null
}

const Cell = ({ value, onUpdate, row, col, errInfo }: CellProps) => {
    const [shouldError, setShouldError] = useState(false);

    // If an error was passed then the cell checks if it's the one having the problem
    // If so change the state to reflect the error
    useEffect(() => {
        if (((errInfo && errInfo.where === "row" && errInfo.index === row) || (errInfo && errInfo.where === "col" && errInfo.index === col)) && errInfo.errValue === value) {
            setShouldError(true);
        } else setShouldError(false);
    }, [col, row, value, errInfo])

    return (
        <span className={`p-2 ${row === 2 || row === 5 ? "border-b-2 border-b-[#00ffd7]" : ""} ${col === 2 || col === 5 ? "border-r-2 border-r-[#00ffd7]" : ""} `} data-col={col}>
            <input
                readOnly
                min={0}
                max={9}
                className={`${row + col % 2 !== 0 ? "rotate-1" : -"rotate-1"} text-white shadow-cell focus-visible:shadow-none duration-150 ease-out outline outline-black  cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center lg:text-3xl  md:text-2xl sm:text-xl bg-transparent  focus-visible:outline-4 caret-transparent focus-visible:outline-flash-normal focus-visible:text-white focus-visible:scale-125 w-full h-full ${shouldError ? "!bg-poppy" : ""} `}
                type="number"
                value={value}
                onKeyDown={(e) => onUpdate({ guess: e.key })}
            />
        </span>
    )
}

export default Cell;