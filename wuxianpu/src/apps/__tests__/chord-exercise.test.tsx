jest.mock("../../common/utils", () => ({
  randomSelect: jest.fn(),
}));

const mockTriggerAttack = jest.fn();

jest.mock("../../components/submitter/lib/piano/piano-audios", () => ({
  getSampler: jest.fn(() => ({ triggerAttack: mockTriggerAttack })),
  noteToSampleId: jest.fn((note: unknown) =>
    String((note as { valueOf: () => number }).valueOf()),
  ),
  enableTone: jest.fn().mockResolvedValue(undefined),
  disableTone: jest.fn(),
  isToneEnabled: jest.fn(() => false),
}));

import { fireEvent, render, screen } from "@testing-library/react";
import * as utils from "../../common/utils";
import {
  Accidental,
  NoteName,
  NoteNameBase,
  WhiteKeyNoteName,
} from "../../common/notes-utils/notes";
import {
  Chord,
  ChordTypeName,
  ChordVoicing,
  InversionMode,
  getPitchClass,
} from "../../common/chord-utils/chord";
import {
  CANVAS_HIGH,
  CANVAS_LOW,
  generateGeneralizedVoicing,
  generateRandomVoicing,
  generateRootPosition,
  generateSimpleInversion,
  generateWrongOptions,
  isInCanvasRange,
} from "../../common/chord-utils/chord-generator";
import {
  getChordSymbol,
  getFullChineseName,
} from "../../common/chord-utils/chord-names";
import { KeySignature } from "../../common/notes-utils/key-signature";
import ChordCanvas from "../../components/chord-canvas/chord-canvas";
import ChordControl from "../../components/chord-canvas/chord-control";
import ChordTextSubmitter from "../../components/chord-submitter/chord-text-submitter";
import MultiSelectPiano from "../../components/chord-submitter/lib/multi-select-piano";
import ChordVirtualPiano from "../../components/chord-submitter/chord-virtual-piano";
import ChordExercise from "../chord-exercise";

// Always pick the first element — deterministic but valid
beforeEach(() => {
  mockTriggerAttack.mockClear();
  (utils.randomSelect as jest.Mock).mockImplementation(
    (arr: unknown[]) => arr[0],
  );
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeNote(base: NoteNameBase, octave: number, acc = Accidental.NONE) {
  return new NoteName(new WhiteKeyNoteName(base, octave), acc);
}

function makeChord(
  base: NoteNameBase,
  type: ChordTypeName,
  acc = Accidental.NONE,
) {
  return new Chord(makeNote(base, 4, acc), type);
}

// Cycling mock: successive randomSelect calls return different array elements.
// Resets automatically via beforeEach. Call at the start of any test that needs
// generateWrongOptions to produce distinct results.
function rotatingMock() {
  let count = 0;
  (utils.randomSelect as jest.Mock).mockImplementation((arr: unknown[]) => {
    return arr[count++ % arr.length];
  });
}

// ---------------------------------------------------------------------------
// Step 1.1: Chord intervals
// ---------------------------------------------------------------------------

describe("Chord.getSemitoneIntervals", () => {
  const EXPECTED: [ChordTypeName, number[]][] = [
    [ChordTypeName.MAJOR_TRIAD, [0, 4, 7]],
    [ChordTypeName.MINOR_TRIAD, [0, 3, 7]],
    [ChordTypeName.AUGMENTED_TRIAD, [0, 4, 8]],
    [ChordTypeName.DIMINISHED_TRIAD, [0, 3, 6]],
    [ChordTypeName.MAJOR_MAJOR_SEVENTH, [0, 4, 7, 11]],
    [ChordTypeName.MAJOR_MINOR_SEVENTH, [0, 4, 7, 10]],
    [ChordTypeName.MINOR_MAJOR_SEVENTH, [0, 3, 7, 11]],
    [ChordTypeName.MINOR_MINOR_SEVENTH, [0, 3, 7, 10]],
    [ChordTypeName.DIMINISHED_MINOR_SEVENTH, [0, 3, 6, 10]],
    [ChordTypeName.DIMINISHED_SEVENTH, [0, 3, 6, 9]],
    [ChordTypeName.AUGMENTED_MAJOR_SEVENTH, [0, 4, 8, 11]],
  ];

  test.each(EXPECTED)(
    "ChordTypeName[%i] intervals are %p",
    (type, expected) => {
      expect(makeChord(NoteNameBase.C, type).getSemitoneIntervals()).toEqual(
        expected,
      );
    },
  );
});

// ---------------------------------------------------------------------------
// Step 1.1: getChordToneNoteNames – diatonic spelling
// ---------------------------------------------------------------------------

describe("Chord.getChordToneNoteNames", () => {
  it("C major triad: C-E-G (no accidentals)", () => {
    const notes = makeChord(
      NoteNameBase.C,
      ChordTypeName.MAJOR_TRIAD,
    ).getChordToneNoteNames();
    expect(notes.map((n) => n.whiteKeyNote.noteNameBase)).toEqual([
      NoteNameBase.C,
      NoteNameBase.E,
      NoteNameBase.G,
    ]);
    expect(notes.map((n) => n.accidental)).toEqual([
      Accidental.NONE,
      Accidental.NONE,
      Accidental.NONE,
    ]);
  });

  it("C minor triad: C-Eb-G", () => {
    const notes = makeChord(
      NoteNameBase.C,
      ChordTypeName.MINOR_TRIAD,
    ).getChordToneNoteNames();
    expect(notes[1].whiteKeyNote.noteNameBase).toBe(NoteNameBase.E);
    expect(notes[1].accidental).toBe(Accidental.FLAT);
  });

  it("C diminished triad: C-Eb-Gb", () => {
    const notes = makeChord(
      NoteNameBase.C,
      ChordTypeName.DIMINISHED_TRIAD,
    ).getChordToneNoteNames();
    expect(notes[2].whiteKeyNote.noteNameBase).toBe(NoteNameBase.G);
    expect(notes[2].accidental).toBe(Accidental.FLAT);
  });

  it("F# major triad: F#-A#-C#", () => {
    const notes = makeChord(
      NoteNameBase.F,
      ChordTypeName.MAJOR_TRIAD,
      Accidental.SHARP,
    ).getChordToneNoteNames();
    expect(notes[0].accidental).toBe(Accidental.SHARP); // F#
    expect(notes[1].accidental).toBe(Accidental.SHARP); // A#
    expect(notes[2].accidental).toBe(Accidental.SHARP); // C#
    expect(notes[2].whiteKeyNote.noteNameBase).toBe(NoteNameBase.C);
  });

  it("semitone values match expected intervals from root", () => {
    const chord = makeChord(NoteNameBase.G, ChordTypeName.MAJOR_MINOR_SEVENTH);
    const notes = chord.getChordToneNoteNames();
    const intervals = chord.getSemitoneIntervals();
    for (let i = 0; i < notes.length; i++) {
      expect(notes[i].valueOf() - notes[0].valueOf()).toBe(intervals[i]);
    }
  });
});

// ---------------------------------------------------------------------------
// Step 1.2: generateRootPosition
// ---------------------------------------------------------------------------

describe("generateRootPosition", () => {
  it("bass note pitch class equals root pitch class", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const v = generateRootPosition(chord);
    expect(getPitchClass(v.notes[0])).toBe(getPitchClass(chord.root));
  });

  it("all notes are within canvas range", () => {
    const chord = makeChord(NoteNameBase.G, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    const v = generateRootPosition(chord);
    v.notes.forEach((n) => expect(isInCanvasRange(n)).toBe(true));
  });

  it("close position: span < 12 semitones", () => {
    const chord = makeChord(NoteNameBase.D, ChordTypeName.MINOR_MINOR_SEVENTH);
    const v = generateRootPosition(chord);
    const span = v.notes[v.notes.length - 1].valueOf() - v.notes[0].valueOf();
    expect(span).toBeLessThan(12);
  });

  it("notes are in ascending order", () => {
    const chord = makeChord(NoteNameBase.F, ChordTypeName.DIMINISHED_SEVENTH);
    const v = generateRootPosition(chord);
    for (let i = 1; i < v.notes.length; i++) {
      expect(v.notes[i].valueOf()).toBeGreaterThan(v.notes[i - 1].valueOf());
    }
  });

  it("getInversionIndex returns 0 (root position)", () => {
    const chord = makeChord(NoteNameBase.A, ChordTypeName.MINOR_TRIAD);
    const v = generateRootPosition(chord);
    expect(v.getInversionIndex()).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Step 1.2: generateSimpleInversion
// ---------------------------------------------------------------------------

describe("generateSimpleInversion", () => {
  const chordTypes: ChordTypeName[] = [
    ChordTypeName.MAJOR_TRIAD,
    ChordTypeName.MINOR_TRIAD,
    ChordTypeName.MAJOR_MAJOR_SEVENTH,
    ChordTypeName.MINOR_MINOR_SEVENTH,
  ];

  chordTypes.forEach((type) => {
    const chord = makeChord(NoteNameBase.C, type);
    const noteCount = chord.getSemitoneIntervals().length;

    for (let i = 0; i < noteCount; i++) {
      it(`ChordTypeName[${type}] inversion ${i}: bass pitch class correct`, () => {
        const v = generateSimpleInversion(chord, i);
        const expectedPC = getPitchClass(chord.getChordToneNoteNames()[i]);
        expect(getPitchClass(v.notes[0])).toBe(expectedPC);
      });

      it(`ChordTypeName[${type}] inversion ${i}: all notes in canvas range`, () => {
        const v = generateSimpleInversion(chord, i);
        v.notes.forEach((n) => expect(isInCanvasRange(n)).toBe(true));
      });

      it(`ChordTypeName[${type}] inversion ${i}: no duplicate pitch classes`, () => {
        const v = generateSimpleInversion(chord, i);
        const pcs = v.notes.map(getPitchClass);
        expect(new Set(pcs).size).toBe(pcs.length);
      });
    }
  });
});

// ---------------------------------------------------------------------------
// Step 1.2: generateGeneralizedVoicing
// ---------------------------------------------------------------------------

describe("generateGeneralizedVoicing", () => {
  // For generalized voicing with randomSelect returning arr[0], extraCount will
  // be 0 (Math.floor(Math.random()*1)=0 since random is not mocked). Use a
  // fixed Math.random to control extra-note count deterministically.
  it("at most 5 notes", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const v = generateGeneralizedVoicing(chord);
    expect(v.notes.length).toBeLessThanOrEqual(5);
  });

  it("bass is the lowest note", () => {
    const chord = makeChord(NoteNameBase.G, ChordTypeName.MINOR_MINOR_SEVENTH);
    const v = generateGeneralizedVoicing(chord);
    const minVal = Math.min(...v.notes.map((n) => n.valueOf()));
    expect(v.notes[0].valueOf()).toBe(minVal);
  });

  it("all notes within canvas range", () => {
    const chord = makeChord(
      NoteNameBase.E,
      ChordTypeName.MAJOR_MINOR_SEVENTH,
      Accidental.FLAT,
    );
    const v = generateGeneralizedVoicing(chord);
    v.notes.forEach((n) => expect(isInCanvasRange(n)).toBe(true));
  });

  it("all notes are chord tones (correct pitch classes)", () => {
    const chord = makeChord(NoteNameBase.D, ChordTypeName.DIMINISHED_SEVENTH);
    const v = generateGeneralizedVoicing(chord);
    const validPCs = new Set(chord.getChordToneNoteNames().map(getPitchClass));
    v.notes.forEach((n) => expect(validPCs.has(getPitchClass(n))).toBe(true));
  });

  it("contains at least one note per chord tone pitch class", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const v = generateGeneralizedVoicing(chord);
    const presentPCs = new Set(v.notes.map(getPitchClass));
    chord
      .getChordToneNoteNames()
      .forEach((t) => expect(presentPCs.has(getPitchClass(t))).toBe(true));
  });
});

// ---------------------------------------------------------------------------
// Step 1.3: getFullChineseName
// ---------------------------------------------------------------------------

describe("getFullChineseName", () => {
  it("C major triad root position: C大三和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getFullChineseName(v)).toBe("C大三和弦");
  });

  it("C major triad first inversion: C大六和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const tones = chord.getChordToneNoteNames(); // [C4, E4, G4]
    const e4 = makeNote(NoteNameBase.E, 4);
    const g4 = makeNote(NoteNameBase.G, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const v = new ChordVoicing(chord, [e4, g4, c5]);
    expect(getFullChineseName(v)).toBe("C大六和弦");
    void tones;
  });

  it("C major triad second inversion: C大四六和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const g4 = makeNote(NoteNameBase.G, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const e5 = makeNote(NoteNameBase.E, 5);
    const v = new ChordVoicing(chord, [g4, c5, e5]);
    expect(getFullChineseName(v)).toBe("C大四六和弦");
  });

  it("F# minor triad root position: 升F小三和弦", () => {
    const chord = makeChord(
      NoteNameBase.F,
      ChordTypeName.MINOR_TRIAD,
      Accidental.SHARP,
    );
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getFullChineseName(v)).toBe("升F小三和弦");
  });

  it("C major-major seventh root position: C大大七和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getFullChineseName(v)).toBe("C大大七和弦");
  });

  it("C major-major seventh first inversion: C大大五六和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    // tones: C4, E4, G4, B4 → first inversion: E4, G4, B4, C5
    const e4 = makeNote(NoteNameBase.E, 4);
    const g4 = makeNote(NoteNameBase.G, 4);
    const b4 = makeNote(NoteNameBase.B, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const v = new ChordVoicing(chord, [e4, g4, b4, c5]);
    expect(getFullChineseName(v)).toBe("C大大五六和弦");
  });

  it("C major-major seventh second inversion: C大大三四和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    const g4 = makeNote(NoteNameBase.G, 4);
    const b4 = makeNote(NoteNameBase.B, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const e5 = makeNote(NoteNameBase.E, 5);
    const v = new ChordVoicing(chord, [g4, b4, c5, e5]);
    expect(getFullChineseName(v)).toBe("C大大三四和弦");
  });

  it("C major-major seventh third inversion: C大大二和弦", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    const b4 = makeNote(NoteNameBase.B, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const e5 = makeNote(NoteNameBase.E, 5);
    const g5 = makeNote(NoteNameBase.G, 5);
    const v = new ChordVoicing(chord, [b4, c5, e5, g5]);
    expect(getFullChineseName(v)).toBe("C大大二和弦");
  });

  it("Bb minor-minor seventh root position: 降B小小七和弦", () => {
    const chord = makeChord(
      NoteNameBase.B,
      ChordTypeName.MINOR_MINOR_SEVENTH,
      Accidental.FLAT,
    );
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getFullChineseName(v)).toBe("降B小小七和弦");
  });
});

// ---------------------------------------------------------------------------
// Step 1.3: getChordSymbol
// ---------------------------------------------------------------------------

describe("getChordSymbol", () => {
  it("C major triad root: C", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getChordSymbol(v)).toBe("C");
  });

  it("C major triad first inversion: C/E", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const e4 = makeNote(NoteNameBase.E, 4);
    const g4 = makeNote(NoteNameBase.G, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const v = new ChordVoicing(chord, [e4, g4, c5]);
    expect(getChordSymbol(v)).toBe("C/E");
  });

  it("C major triad second inversion: C/G", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const g4 = makeNote(NoteNameBase.G, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const e5 = makeNote(NoteNameBase.E, 5);
    const v = new ChordVoicing(chord, [g4, c5, e5]);
    expect(getChordSymbol(v)).toBe("C/G");
  });

  it("F# minor triad root: F#m", () => {
    const chord = makeChord(
      NoteNameBase.F,
      ChordTypeName.MINOR_TRIAD,
      Accidental.SHARP,
    );
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getChordSymbol(v)).toBe("F#m");
  });

  it("Bb major-minor seventh root: B♭7", () => {
    const chord = makeChord(
      NoteNameBase.B,
      ChordTypeName.MAJOR_MINOR_SEVENTH,
      Accidental.FLAT,
    );
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getChordSymbol(v)).toBe("B♭7");
  });

  it("C major-major seventh third inversion: Cmaj7/B", () => {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_MAJOR_SEVENTH);
    const b4 = makeNote(NoteNameBase.B, 4);
    const c5 = makeNote(NoteNameBase.C, 5);
    const e5 = makeNote(NoteNameBase.E, 5);
    const g5 = makeNote(NoteNameBase.G, 5);
    const v = new ChordVoicing(chord, [b4, c5, e5, g5]);
    expect(getChordSymbol(v)).toBe("Cmaj7/B");
  });

  it("Ab diminished triad root: A♭dim", () => {
    const chord = makeChord(
      NoteNameBase.A,
      ChordTypeName.DIMINISHED_TRIAD,
      Accidental.FLAT,
    );
    const v = new ChordVoicing(chord, chord.getChordToneNoteNames());
    expect(getChordSymbol(v)).toBe("A♭dim");
  });

  it("canvas range constants: A1=33, E6=88", () => {
    expect(CANVAS_LOW).toBe(33);
    expect(CANVAS_HIGH).toBe(88);
  });
});

// ---------------------------------------------------------------------------
// Step 1.4: generateWrongOptions
// ---------------------------------------------------------------------------

describe("generateWrongOptions", () => {
  // Rotating counter mock ensures different array elements are picked on
  // successive calls, producing varied chord types and roots.
  function rotatingMock() {
    let count = 0;
    (utils.randomSelect as jest.Mock).mockImplementation((arr: unknown[]) => {
      return arr[count++ % arr.length];
    });
  }

  it("returns exactly 3 wrong options", () => {
    rotatingMock();
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const correct = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const wrong = generateWrongOptions(correct, 3);
    expect(wrong).toHaveLength(3);
  });

  it("all wrong options have slash symbols different from correct", () => {
    rotatingMock();
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const correct = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const wrong = generateWrongOptions(correct, 3);
    const correctSym = correct.getSlashSymbol();
    wrong.forEach((w) => expect(w.getSlashSymbol()).not.toBe(correctSym));
  });

  it("all wrong options have distinct slash symbols", () => {
    rotatingMock();
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    const correct = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const wrong = generateWrongOptions(correct, 3);
    const syms = wrong.map((w) => w.getSlashSymbol());
    expect(new Set(syms).size).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// generateRandomVoicing: InversionMode.NO_INVERSION always produces root position
// ---------------------------------------------------------------------------

describe("generateRandomVoicing", () => {
  it("NO_INVERSION always produces root-position voicing", () => {
    // Run multiple times with different mock values
    const mocks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    mocks.forEach((idx) => {
      (utils.randomSelect as jest.Mock).mockImplementation(
        (arr: unknown[]) => arr[idx % arr.length],
      );
      const v = generateRandomVoicing(InversionMode.NO_INVERSION);
      expect(v.getInversionIndex()).toBe(0);
    });
  });
});

// ---------------------------------------------------------------------------
// Milestone 2: ChordCanvas
// ---------------------------------------------------------------------------

function makeVoicing(notes: NoteName[]): ChordVoicing {
  const chord = new Chord(notes[0], ChordTypeName.MAJOR_TRIAD);
  return new ChordVoicing(chord, notes);
}

function getCanvasCtx() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  return canvas.getContext("2d") as jest.Mocked<CanvasRenderingContext2D>;
}

describe("ChordCanvas", () => {
  it("renders N ellipses for an N-note chord", () => {
    const voicing = makeVoicing([
      makeNote(NoteNameBase.C, 4),
      makeNote(NoteNameBase.E, 4),
      makeNote(NoteNameBase.G, 4),
    ]);
    render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    expect(ctx.ellipse.mock.calls.length).toBe(3);
  });

  it("note with octave < 4 is drawn in the bass-staff y range", () => {
    // G2 in bass: note.y = 170, absolute y = 170 + BASS_HEIGHT(140) = 310
    const voicing = makeVoicing([makeNote(NoteNameBase.G, 2)]);
    render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    const y = ctx.ellipse.mock.calls[0][1] as number;
    expect(y).toBeGreaterThan(200);
  });

  it("note with octave >= 4 is drawn in the treble-staff y range", () => {
    // G4 in treble: note.y = 150, absolute y = 150 + TREBLE_HEIGHT(-19) = 131
    const voicing = makeVoicing([makeNote(NoteNameBase.G, 4)]);
    render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    const y = ctx.ellipse.mock.calls[0][1] as number;
    expect(y).toBeLessThan(200);
  });

  it("C4 and D4 adjacent notes get different x positions", () => {
    // D4 is 1 white-key above C4, so D4 (higher note) is offset +22px
    const voicing = makeVoicing([
      makeNote(NoteNameBase.C, 4),
      makeNote(NoteNameBase.D, 4),
    ]);
    render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    expect(ctx.ellipse.mock.calls.length).toBe(2);
    const x0 = ctx.ellipse.mock.calls[0][0] as number;
    const x1 = ctx.ellipse.mock.calls[1][0] as number;
    expect(x0).not.toBe(x1);
  });

  it("non-adjacent notes (E.g. C4 and E4) share the same x position", () => {
    const voicing = makeVoicing([
      makeNote(NoteNameBase.C, 4),
      makeNote(NoteNameBase.E, 4),
    ]);
    render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    const x0 = ctx.ellipse.mock.calls[0][0] as number;
    const x1 = ctx.ellipse.mock.calls[1][0] as number;
    expect(x0).toBe(x1);
  });

  it("Bb4 shows accidental in C major but not in Bb major", () => {
    const voicing = makeVoicing([makeNote(NoteNameBase.B, 4, Accidental.FLAT)]);
    const { rerender } = render(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    // C major has no flats: Bb is not in key → accidental shown
    expect(screen.getByTestId("chord-accidentals").children.length).toBe(1);

    // FLAT_B major has Bb in key → no accidental
    rerender(
      <ChordCanvas
        voicing={voicing}
        keySignature={KeySignature.FLAT_B}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    expect(screen.getByTestId("chord-accidentals").children.length).toBe(0);
  });

  it("renders nothing on canvas when voicing is undefined", () => {
    render(
      <ChordCanvas
        voicing={undefined}
        keySignature={KeySignature.C}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    const ctx = getCanvasCtx();
    expect(ctx.ellipse.mock.calls.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Milestone 2: ChordControl
// ---------------------------------------------------------------------------

describe("ChordControl", () => {
  it("clicking generate button calls onGenerate with a voicing", () => {
    let captured: ChordVoicing | undefined;
    render(
      <ChordControl
        onGenerate={(v) => {
          captured = v;
        }}
        newChordTrigger={false}
      />,
    );
    fireEvent.click(screen.getByText("生成练习题"));
    expect(captured).toBeDefined();
    expect(captured!.notes.length).toBeGreaterThan(0);
  });

  it("default NO_INVERSION mode always generates root-position voicings", () => {
    let captured: ChordVoicing | undefined;
    render(
      <ChordControl
        onGenerate={(v) => {
          captured = v;
        }}
        newChordTrigger={false}
      />,
    );
    fireEvent.click(screen.getByText("生成练习题"));
    expect(captured!.getInversionIndex()).toBe(0);
  });

  it("onGenerate receives the current key signature", () => {
    let capturedKey: KeySignature | undefined;
    render(
      <ChordControl
        onGenerate={(_, ks) => {
          capturedKey = ks;
        }}
        newChordTrigger={false}
      />,
    );
    // Default key is C major — select G major from dropdown
    fireEvent.click(screen.getByText("C大调 / A小调"));
    fireEvent.click(screen.getByText("G大调 / E小调"));
    fireEvent.click(screen.getByText("生成练习题"));
    expect(capturedKey).toBe(KeySignature.G);
  });
});

// ---------------------------------------------------------------------------
// Milestone 3: ChordTextSubmitter
// ---------------------------------------------------------------------------

describe("ChordTextSubmitter", () => {
  function makeKnownVoicing(): ChordVoicing {
    const chord = makeChord(NoteNameBase.C, ChordTypeName.MAJOR_TRIAD);
    return new ChordVoicing(chord, chord.getChordToneNoteNames());
  }

  it("no voicing shows no option buttons", () => {
    render(
      <ChordTextSubmitter
        voicing={undefined}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    expect(screen.queryAllByTestId(/^option-/)).toHaveLength(0);
  });

  it("4 option buttons appear when a voicing is provided", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    expect(screen.getAllByTestId(/^option-/)).toHaveLength(4);
  });

  it("4 options show distinct labels in fullChinese mode", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    const buttons = screen.getAllByTestId(/^option-/);
    const labels = buttons.map((b) => b.textContent ?? "");
    expect(new Set(labels).size).toBe(4);
  });

  it("clicking the correct option shows 正确✅", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByText(getFullChineseName(voicing)));
    expect(screen.getByTestId("text-submitter-message")).toHaveTextContent(
      "正确✅",
    );
  });

  it("correct option gets green styling after clicking it", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    const correctLabel = getFullChineseName(voicing);
    fireEvent.click(screen.getByText(correctLabel));
    const correctButton = screen.getByText(correctLabel).closest("button");
    expect(correctButton?.className).toContain("bg-green-100");
  });

  it("clicking wrong option shows 错误❌, wrong=red, correct=green", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    const correctLabel = getFullChineseName(voicing);
    const allButtons = screen.getAllByTestId(/^option-/);
    const wrongButton = allButtons.find((b) => b.textContent !== correctLabel)!;
    fireEvent.click(wrongButton);
    expect(screen.getByTestId("text-submitter-message")).toHaveTextContent(
      "错误❌",
    );
    expect(wrongButton.className).toContain("bg-red-100");
    const correctButton = screen.getByText(correctLabel).closest("button");
    expect(correctButton?.className).toContain("bg-green-100");
  });

  it("displayMode 文字全称 shows Chinese name of correct option by default", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    expect(screen.getByText(getFullChineseName(voicing))).toBeInTheDocument();
  });

  it("displayMode 和弦固定标记 shows chord symbol of correct option", () => {
    rotatingMock();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
      />,
    );
    // open dropdown and select chord symbol mode
    fireEvent.click(screen.getByText("文字全称"));
    fireEvent.click(screen.getByText("和弦固定标记"));
    expect(screen.getByText(getChordSymbol(voicing))).toBeInTheDocument();
  });

  it("autoGenerate=true calls onTriggerNewChord on correct answer", () => {
    rotatingMock();
    const onTriggerNewChord = jest.fn();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={true}
        onTriggerNewChord={onTriggerNewChord}
      />,
    );
    fireEvent.click(screen.getByText(getFullChineseName(voicing)));
    expect(onTriggerNewChord).toHaveBeenCalledTimes(1);
  });

  it("autoGenerate=true does NOT call onTriggerNewChord on wrong answer", () => {
    rotatingMock();
    const onTriggerNewChord = jest.fn();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={true}
        onTriggerNewChord={onTriggerNewChord}
      />,
    );
    const correctLabel = getFullChineseName(voicing);
    const wrongButton = screen
      .getAllByTestId(/^option-/)
      .find((b) => b.textContent !== correctLabel)!;
    fireEvent.click(wrongButton);
    expect(onTriggerNewChord).not.toHaveBeenCalled();
  });

  it("autoGenerate=false does NOT call onTriggerNewChord even on correct answer", () => {
    rotatingMock();
    const onTriggerNewChord = jest.fn();
    const voicing = makeKnownVoicing();
    render(
      <ChordTextSubmitter
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={onTriggerNewChord}
      />,
    );
    fireEvent.click(screen.getByText(getFullChineseName(voicing)));
    expect(onTriggerNewChord).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Milestone 4: MultiSelectPiano
// ---------------------------------------------------------------------------

describe("MultiSelectPiano", () => {
  it("clicking a key calls onNotesChange with that note included", () => {
    const onNotesChange = jest.fn();
    render(
      <MultiSelectPiano
        onNotesChange={onNotesChange}
        speakerEnabled={false}
        keyColors={new Map()}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // C4
    const lastCall: NoteName[] =
      onNotesChange.mock.calls[onNotesChange.mock.calls.length - 1][0];
    expect(lastCall.some((n) => n.valueOf() === 60)).toBe(true);
  });

  it("clicking the same key twice removes it via onNotesChange", () => {
    const onNotesChange = jest.fn();
    render(
      <MultiSelectPiano
        onNotesChange={onNotesChange}
        speakerEnabled={false}
        keyColors={new Map()}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // add C4
    fireEvent.click(screen.getByTestId("piano-key-60")); // remove C4
    const lastCall: NoteName[] =
      onNotesChange.mock.calls[onNotesChange.mock.calls.length - 1][0];
    expect(lastCall.some((n) => n.valueOf() === 60)).toBe(false);
  });

  it("triggerAttack is called on mouseDown of an unselected key with speaker on", () => {
    render(
      <MultiSelectPiano
        onNotesChange={jest.fn()}
        speakerEnabled={true}
        keyColors={new Map()}
      />,
    );
    fireEvent.mouseDown(screen.getByTestId("piano-key-60"));
    expect(mockTriggerAttack).toHaveBeenCalledTimes(1);
  });

  it("triggerAttack is NOT called when removing a key (even with speaker on)", () => {
    render(
      <MultiSelectPiano
        onNotesChange={jest.fn()}
        speakerEnabled={true}
        keyColors={new Map()}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // add
    mockTriggerAttack.mockClear();
    fireEvent.click(screen.getByTestId("piano-key-60")); // remove
    expect(mockTriggerAttack).not.toHaveBeenCalled();
  });

  it("triggerAttack is NOT called when speaker is off", () => {
    render(
      <MultiSelectPiano
        onNotesChange={jest.fn()}
        speakerEnabled={false}
        keyColors={new Map()}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60"));
    expect(mockTriggerAttack).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Milestone 4: ChordVirtualPiano
// ---------------------------------------------------------------------------

describe("ChordVirtualPiano", () => {
  it("no voicing + submit shows 请先生成练习题!", () => {
    render(
      <ChordVirtualPiano
        voicing={undefined}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByText("提交答案"));
    expect(screen.getByTestId("virtual-piano-message")).toHaveTextContent(
      "请先生成练习题!",
    );
  });

  it("submitting all correct keys shows 正确✅ and green keys (C major triad)", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MAJOR_TRIAD,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // C4
    fireEvent.click(screen.getByTestId("piano-key-64")); // E4
    fireEvent.click(screen.getByTestId("piano-key-67")); // G4
    fireEvent.click(screen.getByText("提交答案"));
    expect(screen.getByTestId("virtual-piano-message")).toHaveTextContent(
      "正确✅",
    );
    expect(screen.getByTestId("piano-key-60")).toHaveStyle({
      backgroundColor: "#7CFC00",
    });
  });

  it("submitting wrong/missing keys shows 错误❌ with correct color coding (C minor triad)", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MINOR_TRIAD,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    // voicing.notes: C4(60), Eb4(63), G4(67)
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // C4 — correct
    fireEvent.click(screen.getByTestId("piano-key-64")); // E4 — wrong (should be Eb4)
    // G4(67) not clicked — missing → yellow
    fireEvent.click(screen.getByText("提交答案"));
    expect(screen.getByTestId("virtual-piano-message")).toHaveTextContent(
      "错误❌",
    );
    expect(screen.getByTestId("piano-key-60")).toHaveStyle({
      backgroundColor: "#7CFC00",
    }); // green
    expect(screen.getByTestId("piano-key-64")).toHaveStyle({
      backgroundColor: "red",
    }); // red (wrong)
    expect(screen.getByTestId("piano-key-63")).toHaveStyle({
      backgroundColor: "yellow",
    }); // yellow (Eb4 missing)
    expect(screen.getByTestId("piano-key-67")).toHaveStyle({
      backgroundColor: "yellow",
    }); // yellow (G4 missing)
  });

  it("submitting all correct keys shows 正确✅ (C major-major seventh)", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MAJOR_MAJOR_SEVENTH,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    // voicing.notes: C4(60), E4(64), G4(67), B4(71)
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={jest.fn()}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60"));
    fireEvent.click(screen.getByTestId("piano-key-64"));
    fireEvent.click(screen.getByTestId("piano-key-67"));
    fireEvent.click(screen.getByTestId("piano-key-71")); // B4
    fireEvent.click(screen.getByText("提交答案"));
    expect(screen.getByTestId("virtual-piano-message")).toHaveTextContent(
      "正确✅",
    );
  });

  it("autoGenerate=true calls onTriggerNewChord on correct answer", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MAJOR_TRIAD,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const onTriggerNewChord = jest.fn();
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={true}
        onTriggerNewChord={onTriggerNewChord}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60"));
    fireEvent.click(screen.getByTestId("piano-key-64"));
    fireEvent.click(screen.getByTestId("piano-key-67"));
    fireEvent.click(screen.getByText("提交答案"));
    expect(onTriggerNewChord).toHaveBeenCalledTimes(1);
  });

  it("autoGenerate=false does NOT call onTriggerNewChord even on correct answer", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MAJOR_TRIAD,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const onTriggerNewChord = jest.fn();
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={false}
        onTriggerNewChord={onTriggerNewChord}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60"));
    fireEvent.click(screen.getByTestId("piano-key-64"));
    fireEvent.click(screen.getByTestId("piano-key-67"));
    fireEvent.click(screen.getByText("提交答案"));
    expect(onTriggerNewChord).not.toHaveBeenCalled();
  });

  it("autoGenerate=true does NOT call onTriggerNewChord on wrong answer", () => {
    const chord = new Chord(
      makeNote(NoteNameBase.C, 4),
      ChordTypeName.MAJOR_TRIAD,
    );
    const voicing = new ChordVoicing(chord, chord.getChordToneNoteNames());
    const onTriggerNewChord = jest.fn();
    render(
      <ChordVirtualPiano
        voicing={voicing}
        autoGenerate={true}
        onTriggerNewChord={onTriggerNewChord}
        speakerEnabled={false}
        onSpeakerToggle={() => {}}
      />,
    );
    fireEvent.click(screen.getByTestId("piano-key-60")); // C4 only — incomplete
    fireEvent.click(screen.getByText("提交答案"));
    expect(onTriggerNewChord).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Speaker toggle sync (ChordExercise integration)
// ---------------------------------------------------------------------------

describe("speaker toggle sync (chord exercise)", () => {
  it("canvas and virtual-piano speaker toggles stay in sync", () => {
    render(<ChordExercise />);

    // Navigate to the virtual piano submitter so both toggles are visible
    fireEvent.click(screen.getByText("虚拟钢琴"));

    const canvasLabel = document.querySelector(
      "#chord-canvas-speaker-toggle label.slider",
    ) as HTMLElement;
    const pianoLabel = document.querySelector(
      "#chord-virtual-piano-speaker-toggle label.slider",
    ) as HTMLElement;
    const canvasInput = document.querySelector(
      "#chord-canvas-speaker-toggle input",
    ) as HTMLInputElement;
    const pianoInput = document.querySelector(
      "#chord-virtual-piano-speaker-toggle input",
    ) as HTMLInputElement;

    // Initially both off
    expect(canvasInput.checked).toBe(false);
    expect(pianoInput.checked).toBe(false);

    // Toggle canvas on → piano should also turn on
    fireEvent.click(canvasLabel);
    expect(canvasInput.checked).toBe(true);
    expect(pianoInput.checked).toBe(true);

    // Toggle piano off → canvas should also turn off
    fireEvent.click(pianoLabel);
    expect(canvasInput.checked).toBe(false);
    expect(pianoInput.checked).toBe(false);
  });
});
