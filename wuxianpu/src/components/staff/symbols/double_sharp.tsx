export function DoubleSharp({ x, y }: { x: number; y: number }) {
    return (
        <img
            className="absolute -translate-x-1/2 -translate-y-1/2 w-7"
            src="assets/double-sharp.png"
            style={{left: `${x}px`, top: `${y}px`}}
        />
    )
}
