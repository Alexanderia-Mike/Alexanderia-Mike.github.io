import { useEffect, useRef, useState } from "react";
import {
  getMidi,
  handleMidiMessages,
  midiToNoteName,
} from "../submitter/lib/midi";
import { NoteName } from "../../common/notes-utils/notes";
import { ChordVoicing } from "../../common/chord-utils/chord";
import Button from "../../common/button/button";
import clsx from "clsx";
import { FloatingDiv } from "../../common/floatingdiv/floatingdiv";
import ReadOnlyPiano from "../submitter/lib/piano/readonly-piano";

function isAllCorrect(
  held: NoteName[],
  voicing: ChordVoicing | undefined,
): boolean {
  if (!voicing || held.length !== voicing.notes.length) return false;
  return voicing.notes.every((n) =>
    held.some((h) => h.valueOf() === n.valueOf()),
  );
}

export default function ChordMidiPiano({
  voicing,
  autoGenerate,
  onTriggerNewChord,
  incrementCorrect,
  incrementTotal,
}: {
  voicing: ChordVoicing | undefined;
  autoGenerate: boolean;
  onTriggerNewChord: () => void;
  incrementCorrect?: () => void;
  incrementTotal?: () => void;
}) {
  const [deviceMessage, setDeviceMessage] = useState("");
  const [deviceHealthy, setDeviceHealthy] = useState(true);
  const [heldNotes, setHeldNotes] = useState<NoteName[]>([]);

  const heldNotesRef = useRef<NoteName[]>([]);
  const voicingRef = useRef<ChordVoicing | undefined>(undefined);
  const correctTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoGenerateRef = useRef(autoGenerate);
  const onTriggerNewChordRef = useRef(onTriggerNewChord);
  const incrementCorrectRef = useRef(incrementCorrect);
  const incrementTotalRef = useRef(incrementTotal);

  useEffect(() => {
    autoGenerateRef.current = autoGenerate;
  }, [autoGenerate]);
  useEffect(() => {
    onTriggerNewChordRef.current = onTriggerNewChord;
  }, [onTriggerNewChord]);
  useEffect(() => {
    incrementCorrectRef.current = incrementCorrect;
  }, [incrementCorrect]);
  useEffect(() => {
    incrementTotalRef.current = incrementTotal;
  }, [incrementTotal]);

  useEffect(() => {
    voicingRef.current = voicing;
    heldNotesRef.current = [];
    setHeldNotes([]);
    if (correctTimerRef.current !== null) {
      clearTimeout(correctTimerRef.current);
      correctTimerRef.current = null;
    }
  }, [voicing]);

  const onMidiChange = (newHeld: NoteName[]) => {
    heldNotesRef.current = newHeld;
    setHeldNotes([...newHeld]);

    if (isAllCorrect(newHeld, voicingRef.current)) {
      if (correctTimerRef.current === null) {
        correctTimerRef.current = setTimeout(() => {
          correctTimerRef.current = null;
          if (isAllCorrect(heldNotesRef.current, voicingRef.current)) {
            incrementTotalRef.current?.();
            incrementCorrectRef.current?.();
            if (autoGenerateRef.current) {
              onTriggerNewChordRef.current();
            }
          }
        }, 1000);
      }
    } else {
      if (correctTimerRef.current !== null) {
        clearTimeout(correctTimerRef.current);
        correctTimerRef.current = null;
      }
    }
  };

  const setupMidi = async () => {
    try {
      const midiAccess = await getMidi();
      if (midiAccess.inputs.size === 0) {
        throw new Error("没有检测到 MIDI 设备!");
      }
      const names = [...midiAccess.inputs.values()]
        .map((i) => i.name)
        .join(", ");
      setDeviceHealthy(true);
      setDeviceMessage(`当前连接到设备: [${names}]`);
      handleMidiMessages(midiAccess, (message) => {
        if (!message.data) return;
        const [eventType, keyNote, velocity] = message.data;
        const isNoteOn = eventType === 144 && velocity > 0;
        const isNoteOff =
          eventType === 128 || (eventType === 144 && velocity === 0);
        if (!isNoteOn && !isNoteOff) return;
        const note = midiToNoteName(keyNote);
        if (!note) return;
        const current = heldNotesRef.current;
        if (isNoteOn) {
          if (!current.some((n) => n.valueOf() === note.valueOf())) {
            onMidiChange([...current, note]);
          }
        } else {
          onMidiChange(current.filter((n) => n.valueOf() !== note.valueOf()));
        }
      });
    } catch (e) {
      setDeviceHealthy(false);
      setDeviceMessage((e as Error).message);
    }
  };

  useEffect(() => {
    void setupMidi();
  }, []);

  return (
    <div className="min-h-[500px]">
      <div className="flex flex-row justify-center items-center">
        <span
          className={clsx(
            "text-center flex text-lg me-1",
            deviceHealthy ? "text-green-400" : "text-red-500",
          )}
        >
          {deviceMessage}
        </span>
        <FloatingDiv
          content="请用数据线连接您的电脑和支持 MIDI API 的电子乐器"
          width={20}
        />
        <Button label="重新连接" onClick={setupMidi} hide={deviceHealthy} />
      </div>
      {!voicing && (
        <p className="text-center text-gray-500 mt-4">请先生成练习题!</p>
      )}
      <div className="w-full my-4">
        <ReadOnlyPiano
          pressedKeys={heldNotes}
          correctKeys={voicing?.notes ?? []}
          showColor={heldNotes.length != 0}
          grayed={!deviceHealthy}
          resizable={true}
        />
      </div>
    </div>
  );
}
