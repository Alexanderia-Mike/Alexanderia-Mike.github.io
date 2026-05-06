import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChordVoicing } from "../../common/chord-utils/chord";
import { generateWrongOptions } from "../../common/chord-utils/chord-generator";
import {
  getChordSymbol,
  getFullChineseName,
} from "../../common/chord-utils/chord-names";
import { DropdownMenu } from "../../common/dropdownmenu/dropdownmenu";
import Button from "../../common/button/button";

type PerOptionMode = "fullChinese" | "chordSymbol";
type DisplayMode = PerOptionMode | "mixed";

function shuffleWithCorrect<T>(arr: T[]): {
  shuffled: T[];
  correctIndex: number;
} {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { shuffled, correctIndex: shuffled.indexOf(arr[0]) };
}

export default function ChordTextSubmitter({
  voicing,
  autoGenerate,
  onTriggerNewChord,
}: {
  voicing: ChordVoicing | undefined;
  autoGenerate: boolean;
  onTriggerNewChord: () => void;
}) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("fullChinese");
  const [options, setOptions] = useState<ChordVoicing[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [optionModes, setOptionModes] = useState<PerOptionMode[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setSelectedIndex(null);
    setSubmitted(false);
    setMessage("");
    if (!voicing) {
      setOptions([]);
      return;
    }
    const wrong = generateWrongOptions(voicing, 3);
    const { shuffled, correctIndex: ci } = shuffleWithCorrect([
      voicing,
      ...wrong,
    ]);
    setOptions(shuffled);
    setCorrectIndex(ci);
    setMessage("请选择正确的和弦名称");
    setOptionModes(
      shuffled.map(() => (Math.random() < 0.5 ? "fullChinese" : "chordSymbol")),
    );
  }, [voicing]);

  const getOptionLabel = (v: ChordVoicing, idx: number): string => {
    const mode: PerOptionMode =
      displayMode === "mixed"
        ? (optionModes[idx] ?? "fullChinese")
        : displayMode;
    return mode === "fullChinese" ? getFullChineseName(v) : getChordSymbol(v);
  };

  const getButtonClass = (idx: number): string => {
    const base =
      "px-4 py-3 rounded-lg text-sm transition-colors text-left w-full";
    if (!submitted) {
      if (selectedIndex === idx)
        return clsx(base, "border-2 border-blue-500 bg-blue-100");
      return clsx(
        base,
        "border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer",
      );
    }
    if (idx === correctIndex)
      return clsx(base, "border-2 border-green-500 bg-green-100");
    if (idx === selectedIndex)
      return clsx(base, "border-2 border-red-500 bg-red-100");
    return clsx(base, "border border-slate-300 bg-white");
  };

  const handleSubmit = () => {
    if (!voicing) {
      setMessage("请先生成练习题!");
      return;
    }
    if (selectedIndex === null) {
      setMessage("请先选择一个答案!");
      return;
    }
    setSubmitted(true);
    if (selectedIndex === correctIndex) {
      setMessage("正确✅");
      if (autoGenerate) onTriggerNewChord();
    } else {
      setMessage("错误❌");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <DropdownMenu
        elements={[
          { label: "文字全称", value: "fullChinese" as DisplayMode },
          { label: "和弦固定标记", value: "chordSymbol" as DisplayMode },
          { label: "混合", value: "mixed" as DisplayMode },
        ]}
        onSelect={(value) => setDisplayMode(value)}
        defaultIndex={0}
        label="显示模式"
      />
      <div className="grid grid-cols-2 gap-3 my-4 w-full max-w-md">
        {options.map((opt, idx) => (
          <button
            key={idx}
            data-testid={`option-${idx}`}
            className={getButtonClass(idx)}
            onClick={() => {
              if (!submitted) setSelectedIndex(idx);
            }}
          >
            {getOptionLabel(opt, idx)}
          </button>
        ))}
      </div>
      <Button label="提交答案" onClick={handleSubmit} />
      <span className="mt-3 text-center" data-testid="text-submitter-message">
        {message}
      </span>
    </div>
  );
}
