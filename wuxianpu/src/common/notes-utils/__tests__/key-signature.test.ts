import { KeySignature, getKeySignatureTonics, getSharpNotesForKey, getFlatNotesForKey, noteInKeys } from '../key-signature'
import { Accidental, NoteName, NoteNameBase, WhiteKeyNoteName } from '../notes'

describe('getKeySignatureTonics', () => {
    it('C major tonic at octave 4 = C4 natural', () => {
        const tonic = getKeySignatureTonics(KeySignature.C, 4)
        expect(tonic.whiteKeyNote.noteNameBase).toBe(NoteNameBase.C)
        expect(tonic.whiteKeyNote.octave).toBe(4)
        expect(tonic.accidental).toBe(Accidental.NONE)
    })

    it('G major tonic at octave 4 = G4 natural', () => {
        const tonic = getKeySignatureTonics(KeySignature.G, 4)
        expect(tonic.whiteKeyNote.noteNameBase).toBe(NoteNameBase.G)
        expect(tonic.whiteKeyNote.octave).toBe(4)
        expect(tonic.accidental).toBe(Accidental.NONE)
    })

    it('F major tonic at octave 4 = F4 natural', () => {
        const tonic = getKeySignatureTonics(KeySignature.F, 4)
        expect(tonic.whiteKeyNote.noteNameBase).toBe(NoteNameBase.F)
        expect(tonic.accidental).toBe(Accidental.NONE)
    })

    it('SHARP_F tonic = F# (sharp accidental)', () => {
        const tonic = getKeySignatureTonics(KeySignature.SHARP_F, 4)
        expect(tonic.whiteKeyNote.noteNameBase).toBe(NoteNameBase.F)
        expect(tonic.accidental).toBe(Accidental.SHARP)
    })

    it('FLAT_B tonic = Bb', () => {
        const tonic = getKeySignatureTonics(KeySignature.FLAT_B, 4)
        expect(tonic.whiteKeyNote.noteNameBase).toBe(NoteNameBase.B)
        expect(tonic.accidental).toBe(Accidental.FLAT)
    })
})

describe('getSharpNotesForKey', () => {
    it('C major has no sharps', () => {
        expect(getSharpNotesForKey(KeySignature.C)).toHaveLength(0)
    })

    it('G major has one sharp: F', () => {
        const sharps = getSharpNotesForKey(KeySignature.G)
        expect(sharps).toHaveLength(1)
        expect(sharps).toContain(NoteNameBase.F)
    })

    it('D major has two sharps: F, C', () => {
        const sharps = getSharpNotesForKey(KeySignature.D)
        expect(sharps).toHaveLength(2)
        expect(sharps).toContain(NoteNameBase.F)
        expect(sharps).toContain(NoteNameBase.C)
    })

    it('SHARP_C major has all 7 sharps', () => {
        expect(getSharpNotesForKey(KeySignature.SHARP_C)).toHaveLength(7)
    })

    it('F major has no sharps', () => {
        expect(getSharpNotesForKey(KeySignature.F)).toHaveLength(0)
    })
})

describe('getFlatNotesForKey', () => {
    it('C major has no flats', () => {
        expect(getFlatNotesForKey(KeySignature.C)).toHaveLength(0)
    })

    it('F major has one flat: B', () => {
        const flats = getFlatNotesForKey(KeySignature.F)
        expect(flats).toHaveLength(1)
        expect(flats).toContain(NoteNameBase.B)
    })

    it('FLAT_B major has two flats: B, E', () => {
        const flats = getFlatNotesForKey(KeySignature.FLAT_B)
        expect(flats).toHaveLength(2)
        expect(flats).toContain(NoteNameBase.B)
        expect(flats).toContain(NoteNameBase.E)
    })

    it('FLAT_C major has all 7 flats', () => {
        expect(getFlatNotesForKey(KeySignature.FLAT_C)).toHaveLength(7)
    })

    it('G major has no flats', () => {
        expect(getFlatNotesForKey(KeySignature.G)).toHaveLength(0)
    })
})

describe('noteInKeys', () => {
    const note = (base: NoteNameBase, accidental = Accidental.NONE) =>
        new NoteName(new WhiteKeyNoteName(base, 4), accidental)

    it('F# is in G major', () => {
        expect(noteInKeys(note(NoteNameBase.F, Accidental.SHARP), KeySignature.G)).toBe(true)
    })

    it('F natural is NOT in G major', () => {
        expect(noteInKeys(note(NoteNameBase.F), KeySignature.G)).toBe(false)
    })

    it('C natural is in C major', () => {
        expect(noteInKeys(note(NoteNameBase.C), KeySignature.C)).toBe(true)
    })

    it('C# is NOT in C major', () => {
        expect(noteInKeys(note(NoteNameBase.C, Accidental.SHARP), KeySignature.C)).toBe(false)
    })

    it('Bb is in F major', () => {
        expect(noteInKeys(note(NoteNameBase.B, Accidental.FLAT), KeySignature.F)).toBe(true)
    })

    it('B natural is NOT in F major', () => {
        expect(noteInKeys(note(NoteNameBase.B), KeySignature.F)).toBe(false)
    })

    it('double sharps/flats return false (not in key)', () => {
        expect(noteInKeys(note(NoteNameBase.C, Accidental.DOUBLE_SHARP), KeySignature.C)).toBe(false)
    })
})
