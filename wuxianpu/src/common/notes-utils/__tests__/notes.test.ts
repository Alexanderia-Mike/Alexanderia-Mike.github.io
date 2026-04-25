import { NoteNameBase, WhiteKeyNoteName, Accidental, NoteName } from "../notes";
import { PitchNotation } from "../pitch-notation";

describe("WhiteKeyNoteName", () => {
  describe("valueOf", () => {
    it("C4 = 60", () => {
      const c4 = new WhiteKeyNoteName(NoteNameBase.C, 4);
      expect(c4.valueOf()).toBe(60);
    });

    it("A4 = 69", () => {
      const a4 = new WhiteKeyNoteName(NoteNameBase.A, 4);
      expect(a4.valueOf()).toBe(69);
    });

    it("C0 = 12", () => {
      // base value is 12, octave 0, C = 0
      const c0 = new WhiteKeyNoteName(NoteNameBase.C, 0);
      expect(c0.valueOf()).toBe(12);
    });
  });

  describe("equals", () => {
    it("same note is equal", () => {
      const a = new WhiteKeyNoteName(NoteNameBase.G, 4);
      const b = new WhiteKeyNoteName(NoteNameBase.G, 4);
      expect(a.equals(b)).toBe(true);
    });

    it("different note name is not equal", () => {
      const a = new WhiteKeyNoteName(NoteNameBase.G, 4);
      const b = new WhiteKeyNoteName(NoteNameBase.A, 4);
      expect(a.equals(b)).toBe(false);
    });

    it("different octave is not equal", () => {
      const a = new WhiteKeyNoteName(NoteNameBase.C, 4);
      const b = new WhiteKeyNoteName(NoteNameBase.C, 5);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe("toString", () => {
    it('scientific: C4 → "C4"', () => {
      const c4 = new WhiteKeyNoteName(NoteNameBase.C, 4);
      expect(c4.toString(PitchNotation.SCIENTIFIC)).toBe("C4");
    });

    it('scientific: A4 → "A4"', () => {
      const a4 = new WhiteKeyNoteName(NoteNameBase.A, 4);
      expect(a4.toString(PitchNotation.SCIENTIFIC)).toBe("A4");
    });

    it('Helmholtz: C3 → "c"', () => {
      const c3 = new WhiteKeyNoteName(NoteNameBase.C, 3);
      expect(c3.toString(PitchNotation.HELMHOLTZ)).toBe("c");
    });

    it('Helmholtz: C4 → "c1"', () => {
      const c4 = new WhiteKeyNoteName(NoteNameBase.C, 4);
      expect(c4.toString(PitchNotation.HELMHOLTZ)).toBe("c1");
    });

    it('Helmholtz: C2 → "C"', () => {
      const c2 = new WhiteKeyNoteName(NoteNameBase.C, 2);
      expect(c2.toString(PitchNotation.HELMHOLTZ)).toBe("C");
    });

    it('Helmholtz: C1 → "C1"', () => {
      const c1 = new WhiteKeyNoteName(NoteNameBase.C, 1);
      expect(c1.toString(PitchNotation.HELMHOLTZ)).toBe("C1");
    });
  });
});

describe("NoteName", () => {
  describe("valueOf", () => {
    it("C4 natural = 60", () => {
      const c4 = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4));
      expect(c4.valueOf()).toBe(60);
    });

    it("C#4 = 61", () => {
      const cs4 = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.C, 4),
        Accidental.SHARP,
      );
      expect(cs4.valueOf()).toBe(61);
    });

    it("Bb3 = 58", () => {
      const bb3 = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.B, 3),
        Accidental.FLAT,
      );
      expect(bb3.valueOf()).toBe(58);
    });
  });

  describe("toFrequency", () => {
    it("A4 = 440 Hz", () => {
      const a4 = new NoteName(new WhiteKeyNoteName(NoteNameBase.A, 4));
      expect(a4.toFrequency()).toBeCloseTo(440.0, 2);
    });

    it("C4 ≈ 261.63 Hz", () => {
      const c4 = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4));
      expect(c4.toFrequency()).toBeCloseTo(261.63, 1);
    });

    it("A5 = 880 Hz (one octave above A4)", () => {
      const a5 = new NoteName(new WhiteKeyNoteName(NoteNameBase.A, 5));
      expect(a5.toFrequency()).toBeCloseTo(880.0, 2);
    });
  });

  describe("equals", () => {
    it("same note is equal", () => {
      const a = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.G, 4),
        Accidental.SHARP,
      );
      const b = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.G, 4),
        Accidental.SHARP,
      );
      expect(a.equals(b)).toBe(true);
    });

    it("enharmonic notes are NOT equal (C# ≠ Db)", () => {
      const cs = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.C, 4),
        Accidental.SHARP,
      );
      const db = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.D, 4),
        Accidental.FLAT,
      );
      expect(cs.equals(db)).toBe(false);
    });

    it("different accidental is not equal", () => {
      const c = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4));
      const cs = new NoteName(
        new WhiteKeyNoteName(NoteNameBase.C, 4),
        Accidental.SHARP,
      );
      expect(c.equals(cs)).toBe(false);
    });
  });

  describe("copy", () => {
    it("returns a new note with the given accidental", () => {
      const c4 = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4));
      const cs4 = c4.copy(Accidental.SHARP);
      expect(cs4.accidental).toBe(Accidental.SHARP);
      expect(cs4.whiteKeyNote.equals(c4.whiteKeyNote)).toBe(true);
    });

    it("does not mutate the original", () => {
      const c4 = new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4));
      c4.copy(Accidental.SHARP);
      expect(c4.accidental).toBe(Accidental.NONE);
    });
  });
});
