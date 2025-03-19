export function Flat({ x, y }: { x: number; y: number }) {
    return (
        <img
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12"
            src="assets/flat.png"
            style={{left: `${x}px`, top: `${y}px`}}
        />
    )
}
