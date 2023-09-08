import { useEffect, useState } from "react";
import { ErrInfo } from "./utils";

interface CellProps {
    value: string,
    onUpdate: ({ guess }: { guess: string }) => void
    row: number,
    col: number,
    errInfo: ErrInfo | null
}

const Cell = ({ value, onUpdate, row, col, errInfo }: CellProps) => {
    const [shouldError, setShouldError] = useState(false);

    useEffect(() => {
        if (((errInfo && errInfo.where === "row" && errInfo.index === row) || (errInfo && errInfo.where === "col" && errInfo.index === col)) && errInfo.errValue === value) {
            setShouldError(true);
        } else setShouldError(false);
    }, [col, row, value, errInfo])

    return (
        <span className={`p-2 ${row === 2 || row === 5 ? "border-b-2 border-b-[#00ffd7]" : ""} ${col === 2 || col === 5 ? "border-r-2 border-r-[#00ffd7]" : ""} `} data-col={col}>
            <input
                min={0}
                max={9}
                className={`${row + col % 2 !== 0 ? "rotate-1" : -"rotate-1"} text-white shadow-[4px_4px_0px_0px_#000000] focus-visible:shadow-none duration-150 ease-out outline outline-2 outline-black  cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center lg:text-4xl  md:text-3xl sm:text-2xl bg-transparent  focus-visible:outline-3 caret-transparent focus-visible:outline-yellow-500  focus-visible:outline-2  focus-visible:text-white focus-visible:scale-125 w-full h-full ${shouldError ? "!bg-[#ff0000]" : ""} `}
                type="number"
                value={value}
                onChange={(e) => onUpdate({ guess: e.target.value[e.target.value.length - 1] })} />
        </span>
    )
}

export default Cell;