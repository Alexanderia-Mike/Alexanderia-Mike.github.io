export function Natural({ x, y }: { x: number; y: number }) {
    return (
        <img
            className="absolute -translate-x-1/2 -translate-y-1/2 w-5"
            src="assets/natural.png"
            style={{left: `${x}px`, top: `${y}px`}}
        />
    )
}
