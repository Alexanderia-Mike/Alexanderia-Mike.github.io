import { Component } from 'react'
import { KeySignature } from '../../../../common/notes-utils/key-signature'
import { Clef } from '../../clef'
import { SymbolProps } from '../common'
import {
    KeyFTreble,
    KeyFlatATreble,
    KeyFlatBTreble,
    KeyFlatCTreble,
    KeyFlatDTreble,
    KeyFlatETreble,
    KeyFlatGTreble,
    KeyFBass,
    KeyFlatABass,
    KeyFlatBBass,
    KeyFlatCBass,
    KeyFlatDBass,
    KeyFlatEBass,
    KeyFlatGBass,
} from './flatkeys'
import {
    KeyATreble,
    KeyBTreble,
    KeyDTreble,
    KeyETreble,
    KeyGTreble,
    KeySharpCTreble,
    KeySharpFTreble,
    KeyABass,
    KeyBBass,
    KeyDBass,
    KeyEBass,
    KeyGBass,
    KeySharpCBass,
    KeySharpFBass,
} from './sharpkeys'
import {
    Accidental,
    NoteName,
    NoteNameBase,
} from '../../../../common/notes-utils/notes'

export function getKeySignatureSymbol(
    keySignature: KeySignature,
    clef: Clef,
    props: SymbolProps
): Component | undefined {
    switch (clef) {
        case Clef.TREBLE:
            switch (keySignature) {
                case KeySignature.C:
                    return undefined
                case KeySignature.A:
                    return new KeyATreble(props)
                case KeySignature.B:
                    return new KeyBTreble(props)
                case KeySignature.D:
                    return new KeyDTreble(props)
                case KeySignature.E:
                    return new KeyETreble(props)
                case KeySignature.F:
                    return new KeyFTreble(props)
                case KeySignature.FLAT_A:
                    return new KeyFlatATreble(props)
                case KeySignature.FLAT_B:
                    return new KeyFlatBTreble(props)
                case KeySignature.FLAT_C:
                    return new KeyFlatCTreble(props)
                case KeySignature.FLAT_D:
                    return new KeyFlatDTreble(props)
                case KeySignature.FLAT_E:
                    return new KeyFlatETreble(props)
                case KeySignature.FLAT_G:
                    return new KeyFlatGTreble(props)
                case KeySignature.G:
                    return new KeyGTreble(props)
                case KeySignature.SHARP_C:
                    return new KeySharpCTreble(props)
                case KeySignature.SHARP_F:
                    return new KeySharpFTreble(props)
            }
        case Clef.BASS:
            switch (keySignature) {
                case KeySignature.C:
                    return undefined
                case KeySignature.A:
                    return new KeyABass(props)
                case KeySignature.B:
                    return new KeyBBass(props)
                case KeySignature.D:
                    return new KeyDBass(props)
                case KeySignature.E:
                    return new KeyEBass(props)
                case KeySignature.F:
                    return new KeyFBass(props)
                case KeySignature.FLAT_A:
                    return new KeyFlatABass(props)
                case KeySignature.FLAT_B:
                    return new KeyFlatBBass(props)
                case KeySignature.FLAT_C:
                    return new KeyFlatCBass(props)
                case KeySignature.FLAT_D:
                    return new KeyFlatDBass(props)
                case KeySignature.FLAT_E:
                    return new KeyFlatEBass(props)
                case KeySignature.FLAT_G:
                    return new KeyFlatGBass(props)
                case KeySignature.G:
                    return new KeyGBass(props)
                case KeySignature.SHARP_C:
                    return new KeySharpCBass(props)
                case KeySignature.SHARP_F:
                    return new KeySharpFBass(props)
            }
    }
}
