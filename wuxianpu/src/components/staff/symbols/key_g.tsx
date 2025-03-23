import { CompositeSymbol, BaseSymbol } from './common'
import { Sharp } from './sharp'

export class KeyG extends CompositeSymbol {
    protected override symbols: BaseSymbol[] = [
        new Sharp({ width: 30, x: 50, y: -40 }),
    ]
}
