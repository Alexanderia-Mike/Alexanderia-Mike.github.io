import { CompositeSymbol, BaseSymbol } from './common'
import { Sharp } from './sharp'

export class KeyD extends CompositeSymbol {
    protected override symbols: BaseSymbol[] = [
        new Sharp({ width: 30, x: 50, y: -40 }),
        new Sharp({ width: 30, x: 70, y: -10 }),
    ]
}
