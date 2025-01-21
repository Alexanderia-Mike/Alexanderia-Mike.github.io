import { useEffect, useRef } from 'react'
import { Clef } from './clef'
import { Note, notes } from './notes_mapping'
import clsx from 'clsx'
import { WhiteKeyNoteName } from '../../common/common'

const BASS_HEIGHT = 140
const TREBLE_HEIGHT = -19

function drawStaffSingle(
    ctx: CanvasRenderingContext2D,
    baseHeight: number,
    canvasWidth: number,
    considerNote: Boolean,
    note: Note | undefined
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
    const baseHeight = clef == Clef.TREBLE ? TREBLE_HEIGHT : BASS_HEIGHT
    ctx.beginPath()
    ctx.arc(canvasWidth / 2, note.y + baseHeight, 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.stroke()
}

export default function Canvas({
    clef,
    noteName,
}: {
    clef: Clef
    noteName: WhiteKeyNoteName | undefined
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const note = noteName && notes[clef].get(noteName)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
                drawStaffSingle(ctx, TREBLE_HEIGHT, canvas.width, clef == Clef.TREBLE, note)
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
    }, [clef, noteName])

    return (
        <div className='relative'>
            <img
                className={clsx(
                    'absolute w-[100px] top-[47px] left-[80px]',
                    clef == Clef.BASS && 'opacity-10'
                )}
                src="gaoyin.png"
                style={{transform: `translateY(${TREBLE_HEIGHT}px)`}}
            />
            <img
                className={clsx(
                    'absolute w-[75px] top-[86px] left-[95px]  translate-y-1',
                    clef == Clef.TREBLE && 'opacity-30'
                )}
                src="diyin.svg"
                style={{transform: `translateY(${BASS_HEIGHT}px)`}}
            />
            <canvas
                className="border border-border-color bg-white w-full h-[385px]"
                ref={canvasRef}
            ></canvas>
        </div>
    )
}
