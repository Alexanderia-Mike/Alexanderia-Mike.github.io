import { SymbolWithImageSource } from './common'

export class Sharp extends SymbolWithImageSource {
    override getImageSource(): string {
        return 'assets/sharp.svg'
    }
}
