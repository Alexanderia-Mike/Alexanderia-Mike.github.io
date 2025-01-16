export class Note {
    constructor(name: String, y: number) {
        this.name = name
        this.y = y
    }

    name: String
    y: number
}

export const notes = {
    treble: [
        new Note('e3', 30),
        new Note('d3', 40),
        new Note('c3', 50),
        new Note('b2', 60),
        new Note('a2', 70),
        // below need additional staff
        new Note('g2', 80),
        new Note('f2', 90),
        new Note('e2', 100),
        new Note('d2', 110),
        new Note('c2', 120),
        new Note('b1', 130),
        new Note('a1', 140),
        new Note('g1', 150),
        new Note('f1', 160),
        new Note('e1', 170),
        new Note('d1', 180),
        // above need additional staff
        new Note('c1', 190),
        new Note('b', 200),
        new Note('a', 210),
        new Note('g', 220),
        new Note('f', 230),
    ],
    bass: [
        new Note('g1', 30),
        new Note('f1', 40),
        new Note('e1', 50),
        new Note('d1', 60),
        new Note('c1', 70),
        // below need additional staff
        new Note('b', 80),
        new Note('a', 90),
        new Note('g', 100),
        new Note('f', 110),
        new Note('e', 120),
        new Note('d', 130),
        new Note('c', 140),
        new Note('B', 150),
        new Note('A', 160),
        new Note('G', 170),
        new Note('F', 180),
        // above need additional staff
        new Note('E', 190),
        new Note('D', 200),
        new Note('C', 210),
        new Note('B1', 220),
        new Note('A1', 230),
    ],
}
