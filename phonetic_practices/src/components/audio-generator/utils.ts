export function noteNumToStr(note: number) {
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

export function noteStrToNum(note_str: string) {
    const note_len = note_str.length;
    const note_level = note_str.substring(0, note_len - 1);
    const base_str = note_str[note_len - 1];
    if (base_str > '9' || base_str < '1') {
        console.error(`noteStrToNum: invalid string: ${note_str}!`);
        throw new Error(`noteStrToNum: invalid string: ${note_str}!`);
    }
    const base = Number(base_str);
    let remainder = 0;
    if (note_level == "C")  remainder = 0;
    else if (note_level == "Db")    remainder = 1;
    else if (note_level == "D")     remainder = 2;
    else if (note_level == "Eb")    remainder = 3;
    else if (note_level == "E")     remainder = 4;
    else if (note_level == "F")     remainder = 5;
    else if (note_level == "Gb")    remainder = 6;
    else if (note_level == "G")     remainder = 7;
    else if (note_level == "Ab")    remainder = 8;
    else if (note_level == "A")     remainder = 9;
    else if (note_level == "Bb")    remainder = 10;
    else if (note_level == "B")     remainder = 11;
    else {
        console.error(`noteStrToNum: invalid string: ${note_str}!`);
        throw new Error(`noteStrToNum: invalid string: ${note_str}!`);
    }
    return base * 12 + remainder;
}

export function delay(time_ms: number) {
    return new Promise( re => setTimeout(re, time_ms) );
}