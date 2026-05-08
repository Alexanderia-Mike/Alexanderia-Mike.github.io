import {
  Accidental,
  NoteNameBase,
  NoteName,
  WhiteKeyNoteName,
} from "../../../../common/notes-utils/notes";
import { noteToSampleId } from "../piano/piano-audios";

jest.mock("tone", () => {
  const mockNode = () => ({
    connect: jest.fn().mockReturnThis(),
    toDestination: jest.fn().mockReturnThis(),
    triggerAttack: jest.fn(),
    triggerRelease: jest.fn(),
    dispose: jest.fn(),
    gain: { value: 1 },
  });
  return {
    Sampler: jest.fn().mockImplementation(mockNode),
    start: jest.fn(),
    loaded: jest.fn(),
  };
});

function makeNote(
  base: NoteNameBase,
  octave: number,
  acc: Accidental = Accidental.NONE,
): NoteName {
  return new NoteName(new WhiteKeyNoteName(base, octave), acc);
}

describe("noteToSampleId", () => {
  describe("no accidental", () => {
    it("C4 → 'C4'", () => {
      expect(noteToSampleId(makeNote(NoteNameBase.C, 4))).toBe("C4");
    });
    it("A4 → 'A4'", () => {
      expect(noteToSampleId(makeNote(NoteNameBase.A, 4))).toBe("A4");
    });
  });

  describe("single flat", () => {
    it("Bb4 → 'Bb4'", () => {
      expect(noteToSampleId(makeNote(NoteNameBase.B, 4, Accidental.FLAT))).toBe(
        "Bb4",
      );
    });
    it("Db3 → 'Db3'", () => {
      expect(noteToSampleId(makeNote(NoteNameBase.D, 3, Accidental.FLAT))).toBe(
        "Db3",
      );
    });
  });

  describe("single sharp", () => {
    it("F#4 → 'F#4'", () => {
      expect(
        noteToSampleId(makeNote(NoteNameBase.F, 4, Accidental.SHARP)),
      ).toBe("F#4");
    });
    it("C#5 → 'C#5'", () => {
      expect(
        noteToSampleId(makeNote(NoteNameBase.C, 5, Accidental.SHARP)),
      ).toBe("C#5");
    });
  });

  describe("double sharp — enharmonic resolution", () => {
    it("C##4 → 'D4'", () => {
      // C4 + 2 semitones = D4
      expect(
        noteToSampleId(makeNote(NoteNameBase.C, 4, Accidental.DOUBLE_SHARP)),
      ).toBe("D4");
    });
    it("F##4 → 'G4'", () => {
      // F4 + 2 semitones = G4
      expect(
        noteToSampleId(makeNote(NoteNameBase.F, 4, Accidental.DOUBLE_SHARP)),
      ).toBe("G4");
    });
    it("B##4 → 'Db5' (crosses octave boundary)", () => {
      // B4 (MIDI 71) + 2 = 73 = Db5
      expect(
        noteToSampleId(makeNote(NoteNameBase.B, 4, Accidental.DOUBLE_SHARP)),
      ).toBe("Db5");
    });
    it("E##3 → 'Gb3'", () => {
      // E3 (MIDI = 12 + 36 + 4 = 52) + 2 = 54 = Gb3
      expect(
        noteToSampleId(makeNote(NoteNameBase.E, 3, Accidental.DOUBLE_SHARP)),
      ).toBe("Gb3");
    });
  });

  describe("double flat — enharmonic resolution", () => {
    it("Dbb4 → 'C4'", () => {
      // D4 - 2 semitones = C4
      expect(
        noteToSampleId(makeNote(NoteNameBase.D, 4, Accidental.DOUBLE_FLAT)),
      ).toBe("C4");
    });
    it("Ebb4 → 'D4'", () => {
      // E4 (MIDI 64) - 2 = 62 = D4
      expect(
        noteToSampleId(makeNote(NoteNameBase.E, 4, Accidental.DOUBLE_FLAT)),
      ).toBe("D4");
    });
    it("Cbb4 → 'Bb3' (crosses octave boundary)", () => {
      // C4 (MIDI 60) - 2 = 58 = Bb3
      expect(
        noteToSampleId(makeNote(NoteNameBase.C, 4, Accidental.DOUBLE_FLAT)),
      ).toBe("Bb3");
    });
    it("Fbb5 → 'Eb5'", () => {
      // F5 (MIDI = 12 + 60 + 5 = 77) - 2 = 75 = Eb5
      expect(
        noteToSampleId(makeNote(NoteNameBase.F, 5, Accidental.DOUBLE_FLAT)),
      ).toBe("Eb5");
    });
  });

  describe("unsupported accidentals throw", () => {
    it("triple sharp throws", () => {
      expect(() =>
        noteToSampleId(makeNote(NoteNameBase.C, 4, Accidental.TRIPLE_SHARP)),
      ).toThrow();
    });
    it("triple flat throws", () => {
      expect(() =>
        noteToSampleId(makeNote(NoteNameBase.C, 4, Accidental.TRIPLE_FLAT)),
      ).toThrow();
    });
  });
});
