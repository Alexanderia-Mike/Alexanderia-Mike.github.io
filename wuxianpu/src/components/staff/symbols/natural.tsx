import { AbstractSymbol } from './common'

export class Natural extends AbstractSymbol {
    override getImageSource(): string {
        return 'assets/natural.png'
    }
}
