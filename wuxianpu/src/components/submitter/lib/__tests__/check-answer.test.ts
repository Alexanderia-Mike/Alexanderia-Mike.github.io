import { checkAnswerNote, checkAnswerSolfege } from "../check-answer";
import {
  Accidental,
  NoteName,
  NoteNameBase,
  WhiteKeyNoteName,
} from "../../../../common/notes-utils/notes";
import {
  GeneralSolfege,
  Solfege,
} from "../../../../common/notes-utils/solfege";
import { PitchNotation } from "../../../../common/notes-utils/pitch-notation";

const note = (
  base: NoteNameBase,
  octave: number,
  accidental = Accidental.NONE,
) => new NoteName(new WhiteKeyNoteName(base, octave), accidental);

const solfege = (s: Solfege, accidental = Accidental.NONE) =>
  new GeneralSolfege(s, accidental);

describe("checkAnswerNote", () => {
  let incrementTotal: jest.Mock;
  let incrementCorrect: jest.Mock;
  let triggerNewNote: jest.Mock;

  beforeEach(() => {
    incrementTotal = jest.fn();
    incrementCorrect = jest.fn();
    triggerNewNote = jest.fn();
  });

  it('currentNote undefined → "请先生成练习题！", no callbacks', () => {
    const [correct, msg] = checkAnswerNote(
      note(NoteNameBase.C, 4),
      undefined,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
    expect(msg).toBe("请先生成练习题！");
    expect(incrementTotal).not.toHaveBeenCalled();
    expect(incrementCorrect).not.toHaveBeenCalled();
    expect(triggerNewNote).not.toHaveBeenCalled();
  });

  it("inputNote undefined, currentNote defined → empty message, no callbacks", () => {
    const [correct, msg] = checkAnswerNote(
      undefined,
      note(NoteNameBase.C, 4),
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
    expect(msg).toBe("");
    expect(incrementTotal).not.toHaveBeenCalled();
  });

  it("correct answer → true, all three callbacks fired", () => {
    const c4 = note(NoteNameBase.C, 4);
    const [correct] = checkAnswerNote(
      c4,
      c4,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(true);
    expect(incrementTotal).toHaveBeenCalledTimes(1);
    expect(incrementCorrect).toHaveBeenCalledTimes(1);
    expect(triggerNewNote).toHaveBeenCalledTimes(1);
  });

  it("wrong answer → false, only incrementTotal fired", () => {
    const c4 = note(NoteNameBase.C, 4);
    const d4 = note(NoteNameBase.D, 4);
    const [correct] = checkAnswerNote(
      c4,
      d4,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
    expect(incrementTotal).toHaveBeenCalledTimes(1);
    expect(incrementCorrect).not.toHaveBeenCalled();
    expect(triggerNewNote).not.toHaveBeenCalled();
  });

  it("enharmonic notes are equal by default (valueOf match)", () => {
    // C#4 and Db4 have the same valueOf
    const cs4 = note(NoteNameBase.C, 4, Accidental.SHARP);
    const db4 = note(NoteNameBase.D, 4, Accidental.FLAT);
    const [correct] = checkAnswerNote(
      cs4,
      db4,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(true);
  });

  it("strict mode: enharmonic notes are NOT equal", () => {
    const cs4 = note(NoteNameBase.C, 4, Accidental.SHARP);
    const db4 = note(NoteNameBase.D, 4, Accidental.FLAT);
    const [correct] = checkAnswerNote(
      cs4,
      db4,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
      PitchNotation.HELMHOLTZ,
      true,
    );
    expect(correct).toBe(false);
  });

  it("display message contains the answer note on wrong answer", () => {
    const c4 = note(NoteNameBase.C, 4);
    const d4 = note(NoteNameBase.D, 4);
    const [, msg] = checkAnswerNote(
      c4,
      d4,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(msg).toContain("错误❌");
    // should show the correct answer (d)
    expect(msg).toContain("d");
  });
});

describe("checkAnswerSolfege", () => {
  let incrementTotal: jest.Mock;
  let incrementCorrect: jest.Mock;
  let triggerNewNote: jest.Mock;

  beforeEach(() => {
    incrementTotal = jest.fn();
    incrementCorrect = jest.fn();
    triggerNewNote = jest.fn();
  });

  it('currentSolfege undefined → "请先生成练习题！", no callbacks', () => {
    const [correct, msg] = checkAnswerSolfege(
      solfege(Solfege.Do),
      undefined,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
    expect(msg).toBe("请先生成练习题！");
    expect(incrementTotal).not.toHaveBeenCalled();
  });

  it("inputSolfege undefined, currentSolfege defined → empty message", () => {
    const [, msg] = checkAnswerSolfege(
      undefined,
      solfege(Solfege.Do),
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(msg).toBe("");
    expect(incrementTotal).not.toHaveBeenCalled();
  });

  it("correct solfege → true, all callbacks fired", () => {
    const do_ = solfege(Solfege.Do);
    const [correct] = checkAnswerSolfege(
      do_,
      do_,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(true);
    expect(incrementCorrect).toHaveBeenCalledTimes(1);
    expect(triggerNewNote).toHaveBeenCalledTimes(1);
  });

  it("wrong solfege → false, only incrementTotal fired", () => {
    const do_ = solfege(Solfege.Do);
    const re = solfege(Solfege.Re);
    const [correct] = checkAnswerSolfege(
      do_,
      re,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
    expect(incrementTotal).toHaveBeenCalledTimes(1);
    expect(incrementCorrect).not.toHaveBeenCalled();
  });

  it("same solfege, different accidental → wrong", () => {
    const doNatural = solfege(Solfege.Do, Accidental.NONE);
    const doSharp = solfege(Solfege.Do, Accidental.SHARP);
    const [correct] = checkAnswerSolfege(
      doNatural,
      doSharp,
      incrementTotal,
      incrementCorrect,
      triggerNewNote,
    );
    expect(correct).toBe(false);
  });
});
