import { AbstractSymbol } from './common'

export class Sharp extends AbstractSymbol {
    override getImageSource(): string {
        return 'assets/sharp.png'
    }
}
