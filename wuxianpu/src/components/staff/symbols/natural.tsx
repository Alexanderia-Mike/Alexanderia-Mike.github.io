import { SymbolWithImageSource } from './common'

export class Natural extends SymbolWithImageSource {
    override getImageSource(): string {
        return 'assets/natural.png'
    }
}
