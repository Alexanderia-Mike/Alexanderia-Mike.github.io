import { useEffect, useRef } from 'react'
import { Clef } from './clef'
import { Note } from './notes_mapping'
import clsx from 'clsx'

const BASS_HEIGHT = 200

function drawStaffSingle(
    ctx: CanvasRenderingContext2D,
    baseHeight: number,
    canvasWidth: number,
    considerNote: Boolean,
    note: Note | null
) {
    ctx.strokeStyle = considerNote ? '#000' : '#aaa'
    ctx.lineWidth = 2
    const drawStaffHelper = (height: number, begin: number, end: number) => {
        ctx.beginPath()
        ctx.moveTo(begin, height + baseHeight)
        ctx.lineTo(end, height + baseHeight)
        ctx.stroke()
    }
    // common staff
    for (let i = 90; i <= 170; i += 20) {
        drawStaffHelper(i, 50, canvasWidth - 50)
    }
    if (considerNote && note != null) {
        const NOTE_X = canvasWidth / 2
        // additional staff below
        for (let i = 190; i <= note.y; i += 20) {
            drawStaffHelper(i, NOTE_X - 25, NOTE_X + 25)
        }
        // additional staff above
        const base = Math.ceil((note.y + 10) / 20) * 20 - 10
        for (let i = base; i < 80; i += 20) {
            drawStaffHelper(i, NOTE_X - 25, NOTE_X + 25)
        }
    }
    ctx.strokeStyle = '#000'
}

function drawNote(
    ctx: CanvasRenderingContext2D,
    note: Note,
    clef: Clef,
    canvasWidth: number
) {
    const baseHeight = clef == Clef.TREBLE ? 0 : BASS_HEIGHT
    ctx.beginPath()
    ctx.arc(canvasWidth / 2, note.y + baseHeight, 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.stroke()
}

export default function Canvas({
    clef,
    note,
}: {
    clef: Clef
    note: Note | null
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
                drawStaffSingle(ctx, 0, canvas.width, clef == Clef.TREBLE, note)
                drawStaffSingle(
                    ctx,
                    BASS_HEIGHT,
                    canvas.width,
                    clef == Clef.BASS,
                    note
                )
                note && drawNote(ctx, note, clef, canvas.width)
            }
        }
    }, [clef, note])

    return (
        <>
            <img
                className={clsx(
                    'absolute w-[100px] top-[187px] left-[110px]',
                    clef == Clef.BASS && 'opacity-10'
                )}
                src="gaoyin.png"
            />
            <img
                className={clsx(
                    'absolute w-[75px] top-[225px] left-[125px] translate-y-[200px]',
                    clef == Clef.TREBLE && 'opacity-30'
                )}
                src="diyin.svg"
            />
            <canvas
                className="border border-border-color bg-white w-full h-[470px]"
                ref={canvasRef}
            ></canvas>
        </>
    )
}
