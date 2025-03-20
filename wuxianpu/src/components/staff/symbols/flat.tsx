import { AbstractSymbol } from './common'

export class Flat extends AbstractSymbol {
    override getImageSource(): string {
        return 'assets/flat.png'
    }
}
