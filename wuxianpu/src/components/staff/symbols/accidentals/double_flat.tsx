import { ReactNode } from 'react'
import { BaseSymbol, CompositeSymbol } from '../common'
import { Flat } from './flat'

export class DoubleFlat extends CompositeSymbol {
    protected override symbols: BaseSymbol[] = [
        new Flat({ width: this.props.width, x: 5, y: 0 }),
        new Flat({ width: this.props.width, x: -5, y: 0 }),
    ]
}
