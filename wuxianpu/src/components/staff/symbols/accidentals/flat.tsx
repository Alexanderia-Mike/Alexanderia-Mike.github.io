import { ReactNode } from 'react'
import { SymbolWithImageSource } from '../common'

export class Flat extends SymbolWithImageSource {
    override getImageSource(): string {
        return 'assets/flat.png'
    }

    override render(): ReactNode {
        return this.getImageNode(
            this.getStyle(),
            'absolute -translate-x-1/2 -translate-y-[65%] w-12'
        )
    }
}
