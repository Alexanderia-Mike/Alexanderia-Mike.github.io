import { useEffect, useState } from "react";
import { NoteName } from "../../common/notes-utils/notes";
import { ChordVoicing } from "../../common/chord-utils/chord";
import {
  getChordSymbol,
  getFullChineseName,
} from "../../common/chord-utils/chord-names";
import MultiSelectPiano from "./lib/multi-select-piano";
import Toggle from "../../common/toggle/toggle";
import Button from "../../common/button/button";
import { SelectionPanel } from "../../common/selectionpanel/selectionpanel";
import { PitchNotation } from "../../common/notes-utils/pitch-notation";

export default function ChordVirtualPiano({
  voicing,
  autoGenerate,
  onTriggerNewChord,
  incrementCorrect,
  incrementTotal,
  speakerEnabled,
  onSpeakerToggle,
}: {
  voicing: ChordVoicing | undefined;
  autoGenerate: boolean;
  onTriggerNewChord: () => void;
  incrementCorrect?: () => void;
  incrementTotal?: () => void;
  speakerEnabled: boolean;
  onSpeakerToggle: () => void;
}) {
  const [selectedNotes, setSelectedNotes] = useState<NoteName[]>([]);
  const [keyColors, setKeyColors] = useState<
    Map<string, "green" | "red" | "yellow" | null>
  >(new Map());
  const [message, setMessage] = useState<string>("");
  const [pianoKey, setPianoKey] = useState(0);
  const [pitchNotation, setPitchNotation] = useState<PitchNotation>(
    PitchNotation.HELMHOLTZ,
  );

  useEffect(() => {
    setSelectedNotes([]);
    setKeyColors(new Map());
    setMessage("");
    setPianoKey((k) => k + 1);
  }, [voicing]);

  const handleSubmit = () => {
    if (!voicing) {
      setMessage("请先生成练习题!");
      return;
    }

    const newColors = new Map<string, "green" | "red" | "yellow" | null>();

    for (const note of selectedNotes) {
      const key = note.valueOf().toString();
      if (voicing.notes.some((n) => n.valueOf() === note.valueOf())) {
        newColors.set(key, "green");
      } else {
        newColors.set(key, "red");
      }
    }

    for (const note of voicing.notes) {
      const key = note.valueOf().toString();
      if (!selectedNotes.some((n) => n.valueOf() === note.valueOf())) {
        newColors.set(key, "yellow");
      }
    }

    setKeyColors(newColors);

    const allCorrect =
      voicing.notes.length === selectedNotes.length &&
      voicing.notes.every((n) =>
        selectedNotes.some((s) => s.valueOf() === n.valueOf()),
      );

    incrementTotal?.();
    if (allCorrect) {
      setMessage("正确✅");
      incrementCorrect?.();
      if (autoGenerate) onTriggerNewChord();
    } else {
      setMessage("错误❌");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full min-h-[500px]">
      {voicing && (
        <p className="text-center mb-2 text-sm text-slate-600">
          {getFullChineseName(voicing)} ({getChordSymbol(voicing)})
        </p>
      )}
      <div className="flex justify-center items-center flex-wrap">
        <Toggle
          id="chord-virtual-piano-speaker-toggle"
          label="开启扬声器"
          onChange={onSpeakerToggle}
          checked={speakerEnabled}
          classNames="flex-grow-0"
        />
        <SelectionPanel
          elements={[
            { label: "亥姆霍茲音高记号", value: PitchNotation.HELMHOLTZ },
            { label: "科学音高记号", value: PitchNotation.SCIENTIFIC },
          ]}
          label="音高标记"
          defaultIndex={0}
          onSelect={(value) => setPitchNotation(value)}
          classNames="flex-grow-0"
        />
      </div>
      <div className="w-full my-4">
        <MultiSelectPiano
          key={pianoKey}
          onNotesChange={setSelectedNotes}
          speakerEnabled={speakerEnabled}
          keyColors={keyColors}
          displayNotes={pitchNotation}
        />
      </div>
      <Button label="提交答案" onClick={handleSubmit} />
      <span className="mt-3 text-center" data-testid="virtual-piano-message">
        {message}
      </span>
    </div>
  );
}
