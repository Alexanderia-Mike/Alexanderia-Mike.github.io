export enum PitchNotation {
    HELMHOLTZ = 1,
    SCIENTIFIC = 2,
}

export function helmholtzToScientific(noteString: string): string {
    let noteLetter = noteString[0]
    const octave = noteString[1]
    const isLowerCase = noteLetter.match(/[a-z]/) != null
    if (octave == undefined) {
        if (isLowerCase) {
            return noteLetter.toUpperCase() + '3'
        } else {
            return noteLetter + '2'
        }
    }
    const octaveValue = parseInt(octave)
    if (isLowerCase) {
        return noteLetter.toUpperCase() + `${octaveValue + 3}`
    } else {
        if (octaveValue == 1) {
            return noteLetter + '1'
        } else {
            return noteLetter + '0'
        }
    }
}

export function scientificToHelmholtz(noteString: string): string {
    let noteLetter = noteString[0]
    const octave = parseInt(noteString[1])
    if (octave <= 2) noteLetter = noteLetter.toUpperCase()
    else noteLetter = noteLetter.toLocaleLowerCase()
    let octaveString = ''
    switch (octave) {
        case 0:
            octaveString = '2'
            break
        case 1:
            octaveString = '1'
            break
        case 2:
        case 3:
            octaveString = ''
            break
        default:
            octaveString = `${octave - 3}`
    }
    return noteLetter + octaveString
}