import {
    SharpKeySignatureSymbolBass,
    SharpKeySignatureSymbolTreble,
} from './common'

export class KeyGTreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40]
}

export class KeyDTreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10]
}

export class KeyATreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10, -50]
}

export class KeyETreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10, -50, -20]
}

export class KeyBTreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10, -50, -20, 10]
}

export class KeySharpFTreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10, -50, -20, 10, -30]
}

export class KeySharpCTreble extends SharpKeySignatureSymbolTreble {
    protected override ys: number[] = [-40, -10, -50, -20, 10, -30, 0]
}

export class KeyGBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20]
}

export class KeyDBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10]
}

export class KeyABass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10, -30]
}

export class KeyEBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10, -30, 0]
}

export class KeyBBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10, -30, 0, 30]
}

export class KeySharpFBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10, -30, 0, 30, -10]
}

export class KeySharpCBass extends SharpKeySignatureSymbolBass {
    protected override ys: number[] = [-20, 10, -30, 0, 30, -10, 20]
}
