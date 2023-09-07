interface CellProps {
    value: string,
    onUpdate: ({ guess }: { guess: string }) => void
    row: number,
    col: number
}

const Cell = ({ value, onUpdate, row, col }: CellProps) => {

    return (
        <span className={`p-1 row:border-b-2 row:border-b-white ${row === 2 || row === 5 ? "border-b-2 border-b-neutral-700" : ""} ${col === 2 || col === 5 ? "border-r-2 border-r-neutral-700" : ""}`} data-col={col}>
            <input
                min={0}
                max={9}
                className='cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center lg:text-5xl  md:text-3xl sm:text-xl bg-neutral-900 rounded-md focus-visible:outline-3 caret-transparent focus-visible:outline-yellow-500 focus-visible:bg-neutral-700 w-full h-full'
                type="number"
                value={value}
                onChange={(e) => onUpdate({ guess: e.target.value[e.target.value.length - 1] })} />
        </span>
    )
}

export default Cell;