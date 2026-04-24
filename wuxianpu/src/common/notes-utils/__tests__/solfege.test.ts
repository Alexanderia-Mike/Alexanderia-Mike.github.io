import { Solfege, GeneralSolfege, getSolfegeSeminoteCount, getGeneralSolfegeSeminoteCount } from '../solfege'
import { Accidental } from '../notes'

describe('getSolfegeSeminoteCount', () => {
    it('Do = 0 semitones', () => expect(getSolfegeSeminoteCount(Solfege.Do)).toBe(0))
    it('Re = 2 semitones', () => expect(getSolfegeSeminoteCount(Solfege.Re)).toBe(2))
    it('Mi = 4 semitones', () => expect(getSolfegeSeminoteCount(Solfege.Mi)).toBe(4))
    it('Fa = 5 semitones', () => expect(getSolfegeSeminoteCount(Solfege.Fa)).toBe(5))
    it('So = 7 semitones', () => expect(getSolfegeSeminoteCount(Solfege.So)).toBe(7))
    it('La = 9 semitones', () => expect(getSolfegeSeminoteCount(Solfege.La)).toBe(9))
    it('Ti = 11 semitones', () => expect(getSolfegeSeminoteCount(Solfege.Ti)).toBe(11))
})

describe('getGeneralSolfegeSeminoteCount', () => {
    it('Do natural = 0', () => {
        expect(getGeneralSolfegeSeminoteCount(new GeneralSolfege(Solfege.Do, Accidental.NONE))).toBe(0)
    })

    it('Do sharp = 1', () => {
        expect(getGeneralSolfegeSeminoteCount(new GeneralSolfege(Solfege.Do, Accidental.SHARP))).toBe(1)
    })

    it('Re flat = 1', () => {
        expect(getGeneralSolfegeSeminoteCount(new GeneralSolfege(Solfege.Re, Accidental.FLAT))).toBe(1)
    })
})

describe('GeneralSolfege', () => {
    describe('equals', () => {
        it('same solfege and accidental are equal', () => {
            const a = new GeneralSolfege(Solfege.Mi, Accidental.SHARP)
            const b = new GeneralSolfege(Solfege.Mi, Accidental.SHARP)
            expect(a.equals(b)).toBe(true)
        })

        it('same solfege, different accidental are not equal', () => {
            const a = new GeneralSolfege(Solfege.Mi, Accidental.NONE)
            const b = new GeneralSolfege(Solfege.Mi, Accidental.SHARP)
            expect(a.equals(b)).toBe(false)
        })

        it('different solfege are not equal', () => {
            const a = new GeneralSolfege(Solfege.Do, Accidental.NONE)
            const b = new GeneralSolfege(Solfege.Re, Accidental.NONE)
            expect(a.equals(b)).toBe(false)
        })
    })

    describe('toString', () => {
        it('Do natural → "1"', () => {
            expect(new GeneralSolfege(Solfege.Do, Accidental.NONE).toString()).toBe('1')
        })

        it('sharp Re → "升2"', () => {
            expect(new GeneralSolfege(Solfege.Re, Accidental.SHARP).toString()).toBe('升2')
        })

        it('flat Mi → "降3"', () => {
            expect(new GeneralSolfege(Solfege.Mi, Accidental.FLAT).toString()).toBe('降3')
        })
    })
})
