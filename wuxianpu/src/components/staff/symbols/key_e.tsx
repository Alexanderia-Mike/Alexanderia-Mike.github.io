import { CompositeSymbol, BaseSymbol } from './common'
import { Sharp } from './sharp'

export class KeyE extends CompositeSymbol {
    protected override symbols: BaseSymbol[] = [
        new Sharp({ width: 30, x: 50, y: -40 }),
        new Sharp({ width: 30, x: 70, y: -10 }),
        new Sharp({ width: 30, x: 90, y: -50 }),
        new Sharp({ width: 30, x: 110, y: -20 }),
    ]
}
