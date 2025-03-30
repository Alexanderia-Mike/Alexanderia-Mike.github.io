import { JSX, useContext, useEffect, useRef, useState } from 'react'
import { Clef } from './clef'
import { Note, noteNameToNote } from './notes_mapping'
import { OptionalNote, Accidental } from '../../common/notes-utils/notes'
import { Sharp } from './symbols/accidentals/sharp'
import { Flat } from './symbols/accidentals/flat'
import { DoubleSharp } from './symbols/accidentals/double_sharp'
import { Natural } from './symbols/natural'
import { DoubleFlat } from './symbols/accidentals/double_flat'
import { Treble } from './symbols/treble'
import { Bass } from './symbols/bass'
import { NoteContext } from '../../common/context'
import { getKeySignatureSymbol } from './symbols/key-signatures/utils'
import { KeySignature } from '../../common/notes-utils/key-signature'
import { noteInKeys } from '../../common/notes-utils/key-signature'

const BASS_HEIGHT = 140
const BASS_LEFT = 132.5
const BASS_LEFT_PHONE = 85
const TREBLE_HEIGHT = -19
const TREBLE_LEFT = 130
const TREBLE_LEFT_PHONE = 82.5

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
    setAccidental: React.Dispatch<React.SetStateAction<JSX.Element>>,
    keySignature: KeySignature
) {
    // note dot
    const baseHeight = clef == Clef.TREBLE ? TREBLE_HEIGHT : BASS_HEIGHT
    ctx.beginPath()
    ctx.arc(noteX, note.y + baseHeight, 7, 0, 2 * Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
    ctx.stroke()
    // up down symbol
    const x = noteX - 30
    const y = note.y + baseHeight
    const accidental = note.name.accidental
    if (noteInKeys(note.name, keySignature)) {
        setAccidental(<></>)
    } else {
        const accidentalHtml =
            accidental == Accidental.DOUBLE_SHARP ? (
                <DoubleSharp x={x} y={y} width={28} />
            ) : accidental == Accidental.SHARP ? (
                <Sharp x={x} y={y} width={30} />
            ) : accidental == Accidental.NONE ? (
                <Natural x={x} y={y} width={20} />
            ) : accidental == Accidental.FLAT ? (
                <Flat x={x} y={y} width={48} />
            ) : accidental == Accidental.DOUBLE_FLAT ? (
                <DoubleFlat x={x} y={y} />
            ) : (
                <></>
            )
        setAccidental(accidentalHtml)
    }
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
    const [accidental, setAccidental] = useState<JSX.Element>(<></>)
    const [trebleLeft, setTrebleLeft] = useState(TREBLE_LEFT)
    const [bassLeft, setBassLeft] = useState(BASS_LEFT)
    const [noteXRatio, setNoteXRatio] = useState(0.5)

    const { keySignature } = useContext(NoteContext)

    const refreshCanvas = () => {
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
                        setAccidental,
                        keySignature
                    )
            }
        }
    }

    useEffect(refreshCanvas, [clef, noteName])
    useEffect(() => {
        window.addEventListener('resize', refreshCanvas)
        return () => window.removeEventListener('resize', refreshCanvas)
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 768) {
                setBassLeft(BASS_LEFT_PHONE)
                setTrebleLeft(TREBLE_LEFT_PHONE)
                if (width < 640) {
                    setNoteXRatio(0.8)
                } else if (width < 768) {
                    setNoteXRatio(0.65)
                }
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
            <Treble
                width={100}
                x={trebleLeft}
                y={113 + TREBLE_HEIGHT}
                additionalStyles={{ opacity: clef == Clef.BASS ? 0.3 : 1 }}
            />
            {getKeySignatureSymbol(keySignature, Clef.TREBLE, {
                x: trebleLeft,
                y: 130 + TREBLE_HEIGHT,
                additionalStyles: { opacity: clef == Clef.BASS ? 0.3 : 1 },
            })?.render()}
            <Bass
                width={75}
                x={bassLeft}
                y={126 + BASS_HEIGHT}
                additionalStyles={{ opacity: clef == Clef.TREBLE ? 0.3 : 1 }}
            />
            {getKeySignatureSymbol(keySignature, Clef.BASS, {
                x: bassLeft,
                y: 130 + BASS_HEIGHT,
                additionalStyles: { opacity: clef == Clef.TREBLE ? 0.3 : 1 },
            })?.render()}
            <canvas
                className="border border-border-color bg-white w-full h-[385px]"
                ref={canvasRef}
            ></canvas>
            {accidental}
        </div>
    )
}
