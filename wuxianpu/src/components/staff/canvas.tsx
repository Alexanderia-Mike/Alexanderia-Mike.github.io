import { JSX, useEffect, useRef, useState } from 'react'
import { Clef } from './clef'
import { Note, noteNameToNote } from './notes_mapping'
import clsx from 'clsx'
import { OptionalNote, UpDownSymbol } from '../../common/common'
import { Sharp } from './symbols/sharp'
import { Flat } from './symbols/flat'
import { DoubleSharp } from './symbols/double_sharp'
import { Natural } from './symbols/natural'
import { DoubleFlat } from './symbols/double_flat'

const BASS_HEIGHT = 140
const BASS_LEFT = 95
const BASS_LEFT_PHONE = 65
const TREBLE_HEIGHT = -19
const TREBLE_LEFT = 80
const TREBLE_LEFT_PHONE = 50

function drawStaffSingle(
    ctx: CanvasRenderingContext2D,
    baseHeight: number,
    canvasWidth: number,
    noteX: number,
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
        // additional staff below
        for (let i = 190; i <= note.y; i += 20) {
            drawStaffHelper(i, noteX - 25, noteX + 25)
        }
        // additional staff above
        const base = Math.ceil((note.y + 10) / 20) * 20 - 10
        for (let i = base; i < 80; i += 20) {
            drawStaffHelper(i, noteX - 25, noteX + 25)
        }
    }
    ctx.strokeStyle = '#000'
}

function drawNote(
    ctx: CanvasRenderingContext2D,
    note: Note,
    clef: Clef,
    noteX: number,
    setUpDown: React.Dispatch<React.SetStateAction<JSX.Element>>
) {
    // note dot
    console.log(`note name is ${note.name.toString()}`)
    const baseHeight = clef == Clef.TREBLE ? TREBLE_HEIGHT : BASS_HEIGHT
    ctx.beginPath()
    ctx.arc(noteX, note.y + baseHeight, 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.stroke()
    // up down symbol
    const x = noteX - 30
    const y = note.y + baseHeight
    const upDownSymbol = note.name.upDownSymbol
    const upDownSymbolHtml =
        upDownSymbol == UpDownSymbol.DOUBLE_SHARP ? (
            <DoubleSharp x={x} y={y} width={28} />
        ) : upDownSymbol == UpDownSymbol.SHARP ? (
            <Sharp x={x} y={y} width={48} />
        ) : upDownSymbol == UpDownSymbol.NATURAL ? (
            <Natural x={x} y={y} width={20} />
        ) : upDownSymbol == UpDownSymbol.FLAT ? (
            <Flat x={x} y={y} width={48} />
        ) : upDownSymbol == UpDownSymbol.DOUBLE_FLAT ? (
            <DoubleFlat x={x} y={y} width={48} />
        ) : (
            <></>
        )
    setUpDown(upDownSymbolHtml)
}

export default function Canvas({
    clef,
    noteName,
}: {
    clef: Clef
    noteName: OptionalNote
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const note = noteName && noteNameToNote(noteName, clef)
    const [upDown, setUpDown] = useState<JSX.Element>(<></>)
    const [trebleLeft, setTrebleLeft] = useState(TREBLE_LEFT)
    const [bassLeft, setBassLeft] = useState(BASS_LEFT)
    const [noteXRatio, setNoteXRatio] = useState(0.5)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
                drawStaffSingle(
                    ctx,
                    TREBLE_HEIGHT,
                    canvas.width,
                    canvas.width * noteXRatio,
                    clef == Clef.TREBLE,
                    note
                )
                drawStaffSingle(
                    ctx,
                    BASS_HEIGHT,
                    canvas.width,
                    canvas.width * noteXRatio,
                    clef == Clef.BASS,
                    note
                )
                note &&
                    drawNote(
                        ctx,
                        note,
                        clef,
                        canvas.width * noteXRatio,
                        setUpDown
                    )
            }
        }
    }, [clef, noteName])

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 640) {
                setBassLeft(BASS_LEFT_PHONE)
                setTrebleLeft(TREBLE_LEFT_PHONE)
                setNoteXRatio(0.65)
            } else {
                setBassLeft(BASS_LEFT)
                setTrebleLeft(TREBLE_LEFT)
                setNoteXRatio(0.5)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return (
        <div className="relative w-full">
            <img
                className={clsx(
                    'absolute w-[100px] top-[47px]',
                    clef == Clef.BASS && 'opacity-10'
                )}
                src="assets/gaoyin.png"
                style={{
                    transform: `translateY(${TREBLE_HEIGHT}px)`,
                    left: `${trebleLeft}px`,
                }}
            />
            <img
                className={clsx(
                    'absolute w-[75px] top-[86px] translate-y-1',
                    clef == Clef.TREBLE && 'opacity-30'
                )}
                src="assets/diyin.svg"
                style={{
                    transform: `translateY(${BASS_HEIGHT}px)`,
                    left: `${bassLeft}px`,
                }}
            />
            <canvas
                className="border border-border-color bg-white w-full h-[385px]"
                ref={canvasRef}
            ></canvas>
            {upDown}
        </div>
    )
}
