export function getNoteStr(note: number) {
    let base = Math.floor(note / 12)
    let remainder = note % 12
    let note_level = ""
    if (remainder == 0) note_level += "C"
    else if (remainder == 1) note_level += "Db"
    else if (remainder == 2) note_level += "D"
    else if (remainder == 3) note_level += "Eb"
    else if (remainder == 4) note_level += "E"
    else if (remainder == 5) note_level += "F"
    else if (remainder == 6) note_level += "Gb"
    else if (remainder == 7) note_level += "G"
    else if (remainder == 8) note_level += "Ab"
    else if (remainder == 9) note_level += "A"
    else if (remainder == 10) note_level += "Bb"
    else note_level += "B"
    return note_level + base
}