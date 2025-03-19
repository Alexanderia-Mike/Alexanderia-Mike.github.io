export function DoubleFlat({ x, y }: { x: number; y: number }) {
    return (
        <div>
            <img
                className="absolute -translate-x-[62%] -translate-y-1/2 w-12"
                src="assets/flat.png"
                style={{left: `${x}px`, top: `${y}px`}}
            />
            <img
                className="absolute -translate-x-[38%] -translate-y-1/2 w-12"
                src="assets/flat.png"
                style={{left: `${x}px`, top: `${y}px`}}
            />
        </div>
    )
}
