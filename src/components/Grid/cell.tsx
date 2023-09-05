interface CellProps {
    value: string,
    onUpdate: ({ guess }: { guess: string }) => void
}

const Cell = ({ value, onUpdate }: CellProps) => {
    return (
        <div className='flex flex-shrink justify-center items-center relative bg-white'>
            <input
                min={0}
                max={9}
                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-full text-6xl text-center'
                type="number"
                value={value}
                onChange={(e) => onUpdate({ guess: e.target.value })} />
        </div>
    )
}

export default Cell;