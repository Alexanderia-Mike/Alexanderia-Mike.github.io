import {
    parseWhiteKeyNoteName,
    parseNoteName,
    getInterval,
    getSemitoneCount,
    noteValueToNoteName,
    noteNameToSolfege,
    helmholtzToScientific,
    scientificToHelmholtz,
} from '../utils'
import { Accidental, NoteName, NoteNameBase, WhiteKeyNoteName } from '../notes'
import { PitchNotation } from '../pitch-notation'
import { KeySignature } from '../key-signature'
import { Solfege } from '../solfege'

const note = (base: NoteNameBase, octave: number, accidental = Accidental.NONE) =>
    new NoteName(new WhiteKeyNoteName(base, octave), accidental)

describe('parseWhiteKeyNoteName', () => {
    describe('scientific notation', () => {
        it('"C4" → C4', () => {
            const result = parseWhiteKeyNoteName('C4', PitchNotation.SCIENTIFIC)
            expect(result?.noteNameBase).toBe(NoteNameBase.C)
            expect(result?.octave).toBe(4)
        })

        it('"A4" → A4', () => {
            const result = parseWhiteKeyNoteName('A4', PitchNotation.SCIENTIFIC)
            expect(result?.noteNameBase).toBe(NoteNameBase.A)
            expect(result?.octave).toBe(4)
        })
    })

    describe('Helmholtz notation', () => {
        it('"c" → C3', () => {
            const result = parseWhiteKeyNoteName('c', PitchNotation.HELMHOLTZ)
            expect(result?.noteNameBase).toBe(NoteNameBase.C)
            expect(result?.octave).toBe(3)
        })

        it('"c1" → C4', () => {
            const result = parseWhiteKeyNoteName('c1', PitchNotation.HELMHOLTZ)
            expect(result?.noteNameBase).toBe(NoteNameBase.C)
            expect(result?.octave).toBe(4)
        })

        it('"C" → C2', () => {
            const result = parseWhiteKeyNoteName('C', PitchNotation.HELMHOLTZ)
            expect(result?.noteNameBase).toBe(NoteNameBase.C)
            expect(result?.octave).toBe(2)
        })

        it('"C1" → C1', () => {
            const result = parseWhiteKeyNoteName('C1', PitchNotation.HELMHOLTZ)
            expect(result?.noteNameBase).toBe(NoteNameBase.C)
            expect(result?.octave).toBe(1)
        })
    })
})

describe('parseNoteName', () => {
    it('"升 c1" (Helmholtz) → C#4', () => {
        const result = parseNoteName('升 c1', PitchNotation.HELMHOLTZ)
        expect(result?.whiteKeyNote.noteNameBase).toBe(NoteNameBase.C)
        expect(result?.whiteKeyNote.octave).toBe(4)
        expect(result?.accidental).toBe(Accidental.SHARP)
    })

    it('"降 c" (Helmholtz) → Cb3', () => {
        const result = parseNoteName('降 c', PitchNotation.HELMHOLTZ)
        expect(result?.whiteKeyNote.noteNameBase).toBe(NoteNameBase.C)
        expect(result?.whiteKeyNote.octave).toBe(3)
        expect(result?.accidental).toBe(Accidental.FLAT)
    })

    it('"C4" (scientific, no prefix) → C4 natural', () => {
        const result = parseNoteName('C4', PitchNotation.SCIENTIFIC)
        expect(result?.accidental).toBe(Accidental.NONE)
        expect(result?.whiteKeyNote.octave).toBe(4)
    })
})

describe('getInterval', () => {
    it('C4 → G4 = interval 4 (white-key steps, 0-indexed)', () => {
        const c4 = note(NoteNameBase.C, 4)
        const g4 = note(NoteNameBase.G, 4)
        expect(getInterval(c4, g4)).toBe(4)
    })

    it('C4 → C5 = interval 7', () => {
        const c4 = note(NoteNameBase.C, 4)
        const c5 = note(NoteNameBase.C, 5)
        expect(getInterval(c4, c5)).toBe(7)
    })

    it('G4 → C4 = interval -4 (descending)', () => {
        const g4 = note(NoteNameBase.G, 4)
        const c4 = note(NoteNameBase.C, 4)
        expect(getInterval(g4, c4)).toBe(-4)
    })

    it('same note = interval 0', () => {
        const c4 = note(NoteNameBase.C, 4)
        expect(getInterval(c4, c4)).toBe(0)
    })
})

describe('getSemitoneCount', () => {
    it('C4 → G4 = 7 semitones', () => {
        const c4 = note(NoteNameBase.C, 4)
        const g4 = note(NoteNameBase.G, 4)
        expect(getSemitoneCount(c4, g4)).toBe(7)
    })

    it('A4 → A5 = 12 semitones', () => {
        const a4 = note(NoteNameBase.A, 4)
        const a5 = note(NoteNameBase.A, 5)
        expect(getSemitoneCount(a4, a5)).toBe(12)
    })

    it('G4 → C4 = -7 (descending)', () => {
        const g4 = note(NoteNameBase.G, 4)
        const c4 = note(NoteNameBase.C, 4)
        expect(getSemitoneCount(g4, c4)).toBe(-7)
    })
})

describe('noteValueToNoteName', () => {
    it('value 60 → C4 natural', () => {
        const result = noteValueToNoteName(60)
        expect(result.whiteKeyNote.noteNameBase).toBe(NoteNameBase.C)
        expect(result.whiteKeyNote.octave).toBe(4)
        expect(result.accidental).toBe(Accidental.NONE)
    })

    it('value 61 → C#4', () => {
        const result = noteValueToNoteName(61)
        expect(result.whiteKeyNote.noteNameBase).toBe(NoteNameBase.C)
        expect(result.accidental).toBe(Accidental.SHARP)
    })

    it('value 69 → A4 natural', () => {
        const result = noteValueToNoteName(69)
        expect(result.whiteKeyNote.noteNameBase).toBe(NoteNameBase.A)
        expect(result.whiteKeyNote.octave).toBe(4)
        expect(result.accidental).toBe(Accidental.NONE)
    })
})

describe('noteNameToSolfege', () => {
    it('C4 in C major → Do (1)', () => {
        const result = noteNameToSolfege(note(NoteNameBase.C, 4), KeySignature.C)
        expect(result.solfege).toBe(Solfege.Do)
        expect(result.accidental).toBe(Accidental.NONE)
    })

    it('G4 in C major → So (5)', () => {
        const result = noteNameToSolfege(note(NoteNameBase.G, 4), KeySignature.C)
        expect(result.solfege).toBe(Solfege.So)
        expect(result.accidental).toBe(Accidental.NONE)
    })

    it('D4 in C major → Re (2)', () => {
        const result = noteNameToSolfege(note(NoteNameBase.D, 4), KeySignature.C)
        expect(result.solfege).toBe(Solfege.Re)
        expect(result.accidental).toBe(Accidental.NONE)
    })

    it('G4 in G major → Do (1)', () => {
        const result = noteNameToSolfege(note(NoteNameBase.G, 4), KeySignature.G)
        expect(result.solfege).toBe(Solfege.Do)
        expect(result.accidental).toBe(Accidental.NONE)
    })
})

describe('helmholtzToScientific / scientificToHelmholtz', () => {
    it('"c1" → "C4"', () => {
        expect(helmholtzToScientific('c1')).toBe('C4')
    })

    it('"C4" → "c1"', () => {
        expect(scientificToHelmholtz('C4')).toBe('c1')
    })

    it('round-trip: "c" → "C3" → "c"', () => {
        const scientific = helmholtzToScientific('c')
        expect(scientific).toBe('C3')
        expect(scientificToHelmholtz(scientific!)).toBe('c')
    })

    it('"升 c1" (Helmholtz) → "升C4" (scientific, no space — toString omits space)', () => {
        // Note: parseNoteName requires "升 c1" (space-separated) for input,
        // but NoteName.toString() outputs "升C4" (no space). Round-trip for
        // accidentals is intentionally asymmetric — the UI adds the space prefix.
        expect(helmholtzToScientific('升 c1')).toBe('升C4')
    })
})
