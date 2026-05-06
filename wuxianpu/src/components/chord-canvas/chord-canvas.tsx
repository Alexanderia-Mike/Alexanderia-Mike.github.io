import { JSX, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../common/useWindowSize";
import { Note, noteNameToNote } from "../staff/notes_mapping";
import {
  Accidental,
  NoteName,
  NoteNameBase,
  WhiteKeyNoteName,
} from "../../common/notes-utils/notes";
import { Sharp } from "../staff/symbols/accidentals/sharp";
import { Flat } from "../staff/symbols/accidentals/flat";
import { DoubleSharp } from "../staff/symbols/accidentals/double_sharp";
import { Natural } from "../staff/symbols/natural";
import { DoubleFlat } from "../staff/symbols/accidentals/double_flat";
import { Treble } from "../staff/symbols/treble";
import { Bass } from "../staff/symbols/bass";
import { getKeySignatureSymbol } from "../staff/symbols/key-signatures/utils";
import {
  KeySignature,
  noteInKeys,
} from "../../common/notes-utils/key-signature";
import { ChordVoicing } from "../../common/chord-utils/chord";
import { Clef } from "../staff/clef";

const BASS_HEIGHT = 140;
const BASS_LEFT = 132.5;
const BASS_LEFT_PHONE = 85;
const TREBLE_HEIGHT = -19;
const TREBLE_LEFT = 130;
const TREBLE_LEFT_PHONE = 82.5;

const C4_VALUE = new NoteName(
  new WhiteKeyNoteName(NoteNameBase.C, 4),
  Accidental.NONE,
).valueOf();

function drawStaffLines(
  ctx: CanvasRenderingContext2D,
  baseHeight: number,
  canvasWidth: number,
): void {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  for (let i = 90; i <= 170; i += 20) {
    ctx.beginPath();
    ctx.moveTo(50, i + baseHeight);
    ctx.lineTo(canvasWidth - 50, i + baseHeight);
    ctx.stroke();
  }
}

function drawLedgerLines(
  ctx: CanvasRenderingContext2D,
  baseHeight: number,
  note: Note,
  noteX: number,
): void {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  const drawLine = (y: number) => {
    ctx.beginPath();
    ctx.moveTo(noteX - 25, y + baseHeight);
    ctx.lineTo(noteX + 25, y + baseHeight);
    ctx.stroke();
  };
  for (let i = 190; i <= note.y; i += 20) drawLine(i);
  const base = Math.ceil((note.y + 10) / 20) * 20 - 10;
  for (let i = base; i < 80; i += 20) drawLine(i);
}

function drawNoteHead(
  ctx: CanvasRenderingContext2D,
  note: Note,
  baseHeight: number,
  noteX: number,
): void {
  const oldLineWidth = ctx.lineWidth;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(noteX, note.y + baseHeight, 11, 9, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.lineWidth = oldLineWidth;
}

function buildAccidentalElement(
  noteName: NoteName,
  note: Note,
  baseHeight: number,
  noteX: number,
  keySignature: KeySignature,
  isOffset: boolean,
): JSX.Element | null {
  if (noteInKeys(noteName, keySignature)) return null;
  // Offset notes place the accidental to the right to avoid overlapping the adjacent note on the left
  const x = isOffset ? noteX + 30 : noteX - 30;
  const y = note.y + baseHeight;
  const acc = noteName.accidental;
  if (acc === Accidental.DOUBLE_SHARP)
    return <DoubleSharp x={x} y={y} width={18} />;
  if (acc === Accidental.SHARP) return <Sharp x={x} y={y} width={20} />;
  if (acc === Accidental.NONE) return <Natural x={x} y={y} width={12} />;
  if (acc === Accidental.FLAT) return <Flat x={x} y={y} width={32} />;
  if (acc === Accidental.DOUBLE_FLAT)
    return <DoubleFlat x={x} y={y} width={32} />;
  return null;
}

export default function ChordCanvas({
  voicing,
  keySignature,
}: {
  voicing: ChordVoicing | undefined;
  keySignature: KeySignature;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [accidentals, setAccidentals] = useState<JSX.Element[]>([]);
  const { width: windowWidth } = useWindowSize();

  const trebleLeft = windowWidth < 768 ? TREBLE_LEFT_PHONE : TREBLE_LEFT;
  const bassLeft = windowWidth < 768 ? BASS_LEFT_PHONE : BASS_LEFT;
  const noteXRatio = windowWidth < 640 ? 0.8 : windowWidth < 768 ? 0.65 : 0.5;

  const refreshCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const noteX = canvas.width * noteXRatio;

    drawStaffLines(ctx, TREBLE_HEIGHT, canvas.width);
    drawStaffLines(ctx, BASS_HEIGHT, canvas.width);

    if (!voicing) {
      setAccidentals([]);
      return;
    }

    type NoteEntry = { note: Note; name: NoteName };
    const trebleEntries: NoteEntry[] = [];
    const bassEntries: NoteEntry[] = [];

    for (const noteName of voicing.notes) {
      const clef = noteName.valueOf() < C4_VALUE ? Clef.BASS : Clef.TREBLE;
      const note = noteNameToNote(noteName, clef);
      if (!note) continue;
      if (clef === Clef.TREBLE) trebleEntries.push({ note, name: noteName });
      else bassEntries.push({ note, name: noteName });
    }

    // Higher note (smaller y) is offset +22px when adjacent (1 white-key apart)
    function computeOffsets(entries: NoteEntry[]): boolean[] {
      const offsets = new Array<boolean>(entries.length).fill(false);
      for (let i = 1; i < entries.length; i++) {
        if (entries[i - 1].note.y - entries[i].note.y === 10) offsets[i] = true;
      }
      return offsets;
    }

    const trebleOffsets = computeOffsets(trebleEntries);
    const bassOffsets = computeOffsets(bassEntries);
    const newAccidentals: JSX.Element[] = [];

    for (let i = 0; i < trebleEntries.length; i++) {
      const { note, name } = trebleEntries[i];
      const isOffset = trebleOffsets[i];
      const x = noteX + (isOffset ? 22 : 0);
      drawLedgerLines(ctx, TREBLE_HEIGHT, note, x);
      drawNoteHead(ctx, note, TREBLE_HEIGHT, x);
      const acc = buildAccidentalElement(
        name,
        note,
        TREBLE_HEIGHT,
        x,
        keySignature,
        isOffset,
      );
      if (acc) newAccidentals.push(acc);
    }

    for (let i = 0; i < bassEntries.length; i++) {
      const { note, name } = bassEntries[i];
      const isOffset = bassOffsets[i];
      const x = noteX + (isOffset ? 22 : 0);
      drawLedgerLines(ctx, BASS_HEIGHT, note, x);
      drawNoteHead(ctx, note, BASS_HEIGHT, x);
      const acc = buildAccidentalElement(
        name,
        note,
        BASS_HEIGHT,
        x,
        keySignature,
        isOffset,
      );
      if (acc) newAccidentals.push(acc);
    }

    setAccidentals(newAccidentals);
  };

  useEffect(refreshCanvas, [voicing, keySignature, windowWidth]);

  return (
    <div className="relative w-full">
      <Treble width={100} x={trebleLeft} y={113 + TREBLE_HEIGHT} />
      {getKeySignatureSymbol(keySignature, Clef.TREBLE, {
        x: trebleLeft,
        y: 130 + TREBLE_HEIGHT,
      })?.render()}
      <Bass width={75} x={bassLeft} y={126 + BASS_HEIGHT} />
      {getKeySignatureSymbol(keySignature, Clef.BASS, {
        x: bassLeft,
        y: 130 + BASS_HEIGHT,
      })?.render()}
      <canvas
        className="border border-border-color bg-white w-full h-[385px]"
        ref={canvasRef}
      />
      <div data-testid="chord-accidentals">
        {accidentals.map((el, i) => (
          <span key={i}>{el}</span>
        ))}
      </div>
    </div>
  );
}
