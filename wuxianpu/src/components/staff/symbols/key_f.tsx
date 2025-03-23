import { CompositeSymbol, BaseSymbol } from './common'
import { Flat } from './flat'

export class KeyF extends CompositeSymbol {
    protected override symbols: BaseSymbol[] = [
        new Flat({ width: 30, x: 50, y: 0 }),
    ]
}
