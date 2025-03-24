import {
    FlatKeySignatureSymbolBass,
    FlatKeySignatureSymbolTreble,
} from './common'

export class KeyFTreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0]
}

export class KeyFlatBTreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30]
}

export class KeyFlatETreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30, 10]
}

export class KeyFlatATreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30, 10, -20]
}

export class KeyFlatDTreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30, 10, -20, 20]
}

export class KeyFlatGTreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30, 10, -20, 20, -10]
}

export class KeyFlatCTreble extends FlatKeySignatureSymbolTreble {
    protected override ys: number[] = [0, -30, 10, -20, 20, -10, 30]
}

export class KeyFBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20]
}

export class KeyFlatBBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10]
}

export class KeyFlatEBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10, 30]
}

export class KeyFlatABass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10, 30, 0]
}

export class KeyFlatDBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10, 30, 0, 40]
}

export class KeyFlatGBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10, 30, 0, 40, 10]
}

export class KeyFlatCBass extends FlatKeySignatureSymbolBass {
    protected override ys: number[] = [20, -10, 30, 0, 40, 10, 50]
}
