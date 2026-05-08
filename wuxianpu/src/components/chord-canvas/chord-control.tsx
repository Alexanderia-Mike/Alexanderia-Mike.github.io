import { useEffect, useState } from "react";
import { ChordVoicing, InversionMode } from "../../common/chord-utils/chord";
import { generateRandomVoicing } from "../../common/chord-utils/chord-generator";
import { KeySignature } from "../../common/notes-utils/key-signature";
import Button from "../../common/button/button";
import { DropdownMenu } from "../../common/dropdownmenu/dropdownmenu";
import { FloatingDiv } from "../../common/floatingdiv/floatingdiv";
import Toggle from "../../common/toggle/toggle";
import clsx from "clsx";

export default function ChordControl({
  onGenerate,
  newChordTrigger,
  onAutoGenerateChange,
}: {
  onGenerate: (voicing: ChordVoicing, keySignature: KeySignature) => void;
  newChordTrigger: boolean;
  onAutoGenerateChange?: (v: boolean) => void;
}) {
  const [keySignature, setKeySignature] = useState<KeySignature>(
    KeySignature.C,
  );
  const [inversionMode, setInversionMode] = useState<InversionMode>(
    InversionMode.NO_INVERSION,
  );
  const [autoGenerate, setAutoGenerate] = useState<boolean>(false);
  const [scanAnimate, setScanAnimate] = useState<boolean>(false);
  const [allowNonDiatonic, setAllowNonDiatonic] = useState<boolean>(false);

  const generateButtonOnClick = () => {
    const voicing = generateRandomVoicing(
      inversionMode,
      keySignature,
      !allowNonDiatonic,
    );
    onGenerate(voicing, keySignature);
  };

  useEffect(() => {
    if (autoGenerate) {
      setScanAnimate(true);
      const timeout = setTimeout(() => {
        generateButtonOnClick();
        setScanAnimate(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [newChordTrigger]);

  return (
    <div className={clsx("flex flex-col")}>
      <div
        className={clsx(
          "flex my-5 flex-row items-center flex-wrap",
          "md:flex-col md:items-start md:justify-center",
        )}
      >
        <Toggle
          onChange={() => {
            const next = !autoGenerate;
            setAutoGenerate(next);
            onAutoGenerateChange?.(next);
          }}
          checked={autoGenerate}
          label="自动出题"
          render={() => (
            <div className="flex items-center">
              <span className="mr-1">自动出题 </span>
              <FloatingDiv content="当回答正确后，自动出下一题" width={20} />
            </div>
          )}
        />
        <Toggle
          onChange={() => setAllowNonDiatonic((v) => !v)}
          checked={allowNonDiatonic}
          label="允许离调和弦"
        />
        <DropdownMenu
          elements={[
            { label: "C大调 / A小调", value: KeySignature.C },
            { label: "D大调 / B小调", value: KeySignature.D },
            { label: "E大调 / #C小调", value: KeySignature.E },
            { label: "F大调 / D小调", value: KeySignature.F },
            { label: "G大调 / E小调", value: KeySignature.G },
            { label: "A大调 / #F小调", value: KeySignature.A },
            { label: "B大调 / #G小调", value: KeySignature.B },
            { label: "bC大调 / bA小调", value: KeySignature.FLAT_C },
            { label: "bD大调 / bB小调", value: KeySignature.FLAT_D },
            { label: "bE大调 / C小调", value: KeySignature.FLAT_E },
            { label: "#F大调 / #D小调", value: KeySignature.SHARP_F },
            { label: "bG大调 / bE小调", value: KeySignature.FLAT_G },
            { label: "bA大调 / F小调", value: KeySignature.FLAT_A },
            { label: "bB大调 / G小调", value: KeySignature.FLAT_B },
            { label: "#C大调 / #A小调", value: KeySignature.SHARP_C },
          ]}
          onSelect={(value) => setKeySignature(value)}
          defaultIndex={0}
          label="调号"
          classNames="w-40"
        />
        <DropdownMenu
          elements={[
            { label: "原位和弦", value: InversionMode.NO_INVERSION },
            { label: "简单转位", value: InversionMode.SIMPLE_INVERSIONS },
            { label: "广义转位", value: InversionMode.GENERALIZED_INVERSIONS },
          ]}
          onSelect={(value) => setInversionMode(value)}
          defaultIndex={0}
          label="转位模式"
          classNames="w-40"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-grow justify-center items-center">
          <Button
            label="生成练习题"
            onClick={generateButtonOnClick}
            classNames="relative overflow-hidden"
          >
            {autoGenerate && scanAnimate && (
              <span className="absolute inset-0 bg-[#46a823] w-full h-full left-[-100%] animate-scan" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
