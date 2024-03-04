const NOTE_BASES = [
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"
];

const MAJOR_COUNT = 6;
let NOTES: string[] = [];
for (let major = 1; major <= MAJOR_COUNT; ++major) {
    for (let base of NOTE_BASES) {
        NOTES.push(base + major);
    }
}

export default NOTES;