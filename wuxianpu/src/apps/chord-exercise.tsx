import { useState } from "react";
import clsx from "clsx";
import { ChordVoicing } from "../common/chord-utils/chord";
import { KeySignature } from "../common/notes-utils/key-signature";
import ChordCanvas from "../components/chord-canvas/chord-canvas";
import ChordControl from "../components/chord-canvas/chord-control";

export default function ChordExercise() {
  const [voicing, setVoicing] = useState<ChordVoicing | undefined>(undefined);
  const [keySignature, setKeySignature] = useState<KeySignature>(
    KeySignature.C,
  );
  const [newChordTrigger, setNewChordTrigger] = useState<boolean>(false);

  const handleGenerate = (v: ChordVoicing, ks: KeySignature) => {
    setVoicing(v);
    setKeySignature(ks);
  };

  const triggerNewChord = () => setNewChordTrigger((t) => !t);
  void triggerNewChord;

  return (
    <div className="bg-custom-bg">
      <div
        className={clsx(
          "flex justify-center items-center my-[20px] mx-auto max-w-[1200px] p-[20px] bg-white border-solid border border-border-color rounded shadow-sm relative",
          "flex-col",
          "md:flex-row",
        )}
      >
        <ChordCanvas voicing={voicing} keySignature={keySignature} />
        <ChordControl
          onGenerate={handleGenerate}
          newChordTrigger={newChordTrigger}
        />
      </div>
      <div className="mx-auto max-w-[1200px] p-[20px]">
        <div className="bg-white border border-border-color rounded shadow-sm p-6 text-center text-slate-400">
          提交答案功能即将推出（文字选择 / 虚拟钢琴 / MIDI 钢琴）
        </div>
      </div>
    </div>
  );
}
