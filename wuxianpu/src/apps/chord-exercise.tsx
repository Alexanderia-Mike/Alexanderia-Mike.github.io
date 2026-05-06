import { useState } from "react";
import clsx from "clsx";
import { ChordVoicing } from "../common/chord-utils/chord";
import { KeySignature } from "../common/notes-utils/key-signature";
import ChordCanvas from "../components/chord-canvas/chord-canvas";
import ChordControl from "../components/chord-canvas/chord-control";
import ChordTextSubmitter from "../components/chord-submitter/chord-text-submitter";
import ChordVirtualPiano from "../components/chord-submitter/chord-virtual-piano";
import { Router, RouteConfig } from "../common/router/router";

export default function ChordExercise() {
  const [voicing, setVoicing] = useState<ChordVoicing | undefined>(undefined);
  const [keySignature, setKeySignature] = useState<KeySignature>(
    KeySignature.C,
  );
  const [newChordTrigger, setNewChordTrigger] = useState<boolean>(false);
  const [autoGenerate, setAutoGenerate] = useState<boolean>(false);

  const handleGenerate = (v: ChordVoicing, ks: KeySignature) => {
    setVoicing(v);
    setKeySignature(ks);
  };

  const triggerNewChord = () => setNewChordTrigger((t) => !t);

  const routes: RouteConfig[] = [
    {
      path: "chord-text",
      label: "文字选择",
      element: (
        <ChordTextSubmitter
          voicing={voicing}
          autoGenerate={autoGenerate}
          onTriggerNewChord={triggerNewChord}
        />
      ),
    },
    {
      path: "chord-piano",
      label: "虚拟钢琴",
      element: (
        <ChordVirtualPiano
          voicing={voicing}
          autoGenerate={autoGenerate}
          onTriggerNewChord={triggerNewChord}
        />
      ),
    },
  ];

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
          onAutoGenerateChange={setAutoGenerate}
        />
      </div>
      <div className="mx-auto max-w-[1200px] p-[20px]">
        <Router
          routes={routes}
          defaultRoute="chord-text"
          classNames={{
            navColor: "bg-custom-bg",
            contentColor: "bg-white",
          }}
        />
      </div>
    </div>
  );
}
