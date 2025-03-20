import { ReactNode } from 'react'
import { AbstractSymbol } from './common'

export class DoubleFlat extends AbstractSymbol {
    override getImageSource(): string {
        return 'assets/flat.png'
    }

    override render(): ReactNode {
        return (
            <div>
                {this.getImageNode(
                    this.getStyle(),
                    'absolute -translate-x-[62%] -translate-y-1/2 w-12'
                )}
                {this.getImageNode(
                    this.getStyle(),
                    'absolute -translate-x-[38%] -translate-y-1/2 w-12'
                )}
            </div>
        )
    }
}
