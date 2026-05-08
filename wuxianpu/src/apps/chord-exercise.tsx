import { useState } from "react";
import clsx from "clsx";
import { ChordVoicing } from "../common/chord-utils/chord";
import { KeySignature } from "../common/notes-utils/key-signature";
import ChordCanvas from "../components/chord-canvas/chord-canvas";
import ChordControl from "../components/chord-canvas/chord-control";
import ChordTextSubmitter from "../components/chord-submitter/chord-text-submitter";
import ChordVirtualPiano from "../components/chord-submitter/chord-virtual-piano";
import ScoreBoard from "../components/submitter/score-board";
import { Router, RouteConfig } from "../common/router/router";
import {
  disableTone,
  enableTone,
} from "../components/submitter/lib/piano/piano-audios";

export default function ChordExercise() {
  const [voicing, setVoicing] = useState<ChordVoicing | undefined>(undefined);
  const [keySignature, setKeySignature] = useState<KeySignature>(
    KeySignature.C,
  );
  const [newChordTrigger, setNewChordTrigger] = useState<boolean>(false);
  const [autoGenerate, setAutoGenerate] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [speakerEnabled, setSpeakerEnabled] = useState<boolean>(false);

  const handleSpeakerToggle = () => {
    if (speakerEnabled) {
      disableTone();
      setSpeakerEnabled(false);
    } else {
      void enableTone();
      setSpeakerEnabled(true);
    }
  };

  const handleGenerate = (v: ChordVoicing, ks: KeySignature) => {
    setVoicing(v);
    setKeySignature(ks);
  };

  const triggerNewChord = () => setNewChordTrigger((t) => !t);
  const incrementCorrect = () => setCorrect((c) => c + 1);
  const incrementTotal = () => setTotal((t) => t + 1);

  const routes: RouteConfig[] = [
    {
      path: "chord-text",
      label: "文字选择",
      element: (
        <ChordTextSubmitter
          voicing={voicing}
          autoGenerate={autoGenerate}
          onTriggerNewChord={triggerNewChord}
          incrementCorrect={incrementCorrect}
          incrementTotal={incrementTotal}
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
          incrementCorrect={incrementCorrect}
          incrementTotal={incrementTotal}
          speakerEnabled={speakerEnabled}
          onSpeakerToggle={handleSpeakerToggle}
        />
      ),
    },
    {
      path: "midi-piano",
      label: "MIDI钢琴",
      element: <div className="mb-5 min-h-[500px]">正在开发中...</div>,
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
        <ChordCanvas
          voicing={voicing}
          keySignature={keySignature}
          speakerEnabled={speakerEnabled}
          onSpeakerToggle={handleSpeakerToggle}
        />
        <ChordControl
          onGenerate={handleGenerate}
          newChordTrigger={newChordTrigger}
          onAutoGenerateChange={setAutoGenerate}
        />
      </div>
      <ScoreBoard
        correct={correct}
        setCorrect={setCorrect}
        total={total}
        setTotal={setTotal}
      />
      <div className="mx-auto mt-5">
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
