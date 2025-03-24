import { Flat } from '../accidentals/flat'
import { Sharp } from '../accidentals/sharp'
import { BaseSymbol, CompositeSymbol } from '../common'

abstract class SharpKeySignatureSymbol extends CompositeSymbol {
    protected abstract ys: number[]

    protected abstract baseX: number
    private gapX = 17

    get symbols(): BaseSymbol[] {
        return this.ys.map(
            (y, idx) =>
                new Sharp({ width: 30, x: this.baseX + this.gapX * idx, y: y })
        )
    }
}

export abstract class SharpKeySignatureSymbolTreble extends SharpKeySignatureSymbol {
    protected override baseX = 45
}

export abstract class SharpKeySignatureSymbolBass extends SharpKeySignatureSymbol {
    protected override baseX = 55
}

abstract class FlatKeySignatureSymbol extends CompositeSymbol {
    protected abstract ys: number[]

    protected abstract baseX: number
    private gapX = 15

    get symbols(): BaseSymbol[] {
        return this.ys.map(
            (y, idx) =>
                new Flat({ width: 30, x: this.baseX + this.gapX * idx, y: y })
        )
    }
}

export abstract class FlatKeySignatureSymbolTreble extends FlatKeySignatureSymbol {
    protected override baseX = 45
}

export abstract class FlatKeySignatureSymbolBass extends FlatKeySignatureSymbol {
    protected override baseX = 55
}
