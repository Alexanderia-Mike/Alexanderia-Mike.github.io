import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import {
  Accidental,
  ALL_WHITE_KEYS,
  NoteName,
} from "../../../common/notes-utils/notes";
import { followingBlackKey } from "../../submitter/lib/piano/utils";
import {
  getSampler,
  noteToSampleId,
} from "../../submitter/lib/piano/piano-audios";
import { handleScroll } from "../../submitter/lib/scroll-handler";
import { PitchNotation } from "../../../common/notes-utils/pitch-notation";
import "../../submitter/lib/piano/piano.css";

function getKeyStyle(
  note: NoteName,
  selectedNotes: NoteName[],
  keyColors: Map<string, "green" | "red" | "yellow" | null>,
): React.CSSProperties {
  const color = keyColors.get(note.valueOf().toString());
  if (color === "green") return { backgroundColor: "#7CFC00" };
  if (color === "red") return { backgroundColor: "red" };
  if (color === "yellow") return { backgroundColor: "yellow" };
  if (selectedNotes.some((n) => n.valueOf() === note.valueOf())) {
    return { backgroundColor: "#93c5fd" };
  }
  return {};
}

export default function MultiSelectPiano({
  onNotesChange,
  speakerEnabled,
  keyColors,
  displayNotes,
}: {
  onNotesChange: (notes: NoteName[]) => void;
  speakerEnabled: boolean;
  keyColors: Map<string, "green" | "red" | "yellow" | null>;
  displayNotes?: PitchNotation;
}) {
  const [selectedNotes, setSelectedNotes] = useState<NoteName[]>([]);
  const samplerRef = useRef(getSampler());
  const pendingReleaseRef = useRef<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      containerRef.current &&
      wrapperRef.current &&
      scrollBarRef.current &&
      scrollThumbRef.current
    ) {
      handleScroll(
        containerRef.current,
        wrapperRef.current,
        scrollBarRef.current,
        scrollThumbRef.current,
      );
    }
  }, []);

  const onKeyMouseDown = (note: NoteName, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSelected = selectedNotes.some(
      (n) => n.valueOf() === note.valueOf(),
    );
    if (!isSelected && speakerEnabled) {
      samplerRef.current.triggerAttack(noteToSampleId(note));
      pendingReleaseRef.current.add(note.valueOf().toString());
    }
  };

  const onKeyMouseUp = (note: NoteName, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = note.valueOf().toString();
    if (pendingReleaseRef.current.has(key)) {
      samplerRef.current.triggerRelease(noteToSampleId(note));
      pendingReleaseRef.current.delete(key);
    }
  };

  const handleKeyClick = (note: NoteName, e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadySelected = selectedNotes.some(
      (n) => n.valueOf() === note.valueOf(),
    );
    const next = alreadySelected
      ? selectedNotes.filter((n) => n.valueOf() !== note.valueOf())
      : [...selectedNotes, note];
    setSelectedNotes(next);
    onNotesChange(next);
  };

  return (
    <div
      ref={containerRef}
      className="flex relative piano flex-col justify-start items-center h-[200px] overflow-hidden"
    >
      <div
        ref={scrollBarRef}
        className="w-2/3 h-16 bg-custom-bg relative rounded-xl shadow-inner"
      >
        <div
          ref={scrollThumbRef}
          className="h-full absolute bg-slate-400 w-20 rounded-xl hover:bg-slate-500 active:bg-slate-600 cursor-pointer"
        ></div>
      </div>
      <div
        ref={wrapperRef}
        className="h-full flex w-fit items-start absolute top-20"
      >
        {ALL_WHITE_KEYS.map((whiteKey, i) => {
          const whiteNote = new NoteName(whiteKey);
          const hasBlackChild = followingBlackKey(whiteKey, i);
          const blackNote = hasBlackChild
            ? new NoteName(whiteKey, Accidental.FLAT)
            : null;

          return (
            <div
              key={i}
              data-testid={`piano-key-${whiteNote.valueOf()}`}
              className={clsx(
                "white-key relative flex flex-grow min-w-7 max-w-7 border-r border-y border-black h-36 rounded-b-md cursor-pointer select-none shadow-inner",
                i === 0 && "border-l",
              )}
              style={getKeyStyle(whiteNote, selectedNotes, keyColors)}
              onMouseDown={(e) => onKeyMouseDown(whiteNote, e)}
              onMouseUp={(e) => onKeyMouseUp(whiteNote, e)}
              onMouseLeave={(e) => onKeyMouseUp(whiteNote, e)}
              onClick={(e) => handleKeyClick(whiteNote, e)}
            >
              {blackNote && (
                <div
                  data-testid={`piano-key-${blackNote.valueOf()}`}
                  className="black-key w-2/3 h-2/3 absolute -translate-x-1/2 z-10 bg-black rounded-b-md cursor-pointer select-none hover:bg-gray-500 active:bg-gray-400"
                  style={getKeyStyle(blackNote, selectedNotes, keyColors)}
                  onMouseDown={(e) => onKeyMouseDown(blackNote, e)}
                  onMouseUp={(e) => onKeyMouseUp(blackNote, e)}
                  onMouseLeave={(e) => onKeyMouseUp(blackNote, e)}
                  onClick={(e) => handleKeyClick(blackNote, e)}
                />
              )}
              <div className="w-full h-full flex flex-col justify-end items-center">
                <span>{displayNotes && whiteNote.toString(displayNotes)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
