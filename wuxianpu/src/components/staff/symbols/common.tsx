import { Component, CSSProperties, ReactNode } from 'react'

export interface SymbolProps {
    width?: number
    x?: number
    y?: number
    x_percent?: number
    y_percent?: number
    additionalStyles?: CSSProperties
}

export abstract class BaseSymbol extends Component<SymbolProps> {
    protected getStyle(): CSSProperties {
        const style: CSSProperties = {}
        if (this.props.x != undefined) style.left = `${this.props.x}px`
        if (this.props.y != undefined) style.top = `${this.props.y}px`
        if (this.props.x_percent != undefined)
            style.left = `${this.props.x_percent}%`
        if (this.props.y_percent != undefined)
            style.top = `${this.props.y_percent}%`
        if (this.props.width != undefined) style.width = `${this.props.width}px`
        return { ...style, ...this.props.additionalStyles }
    }
}

export abstract class SymbolWithImageSource extends BaseSymbol {
    protected abstract getImageSource(): string

    protected getImageNode(
        style: CSSProperties,
        className?: string
    ): ReactNode {
        return (
            <div
                className={
                    className || 'absolute -translate-x-1/2 -translate-y-1/2'
                }
                style={style}
            >
                <img className="w-full" src={this.getImageSource()} />
            </div>
        )
    }

    override render(): ReactNode {
        return this.getImageNode(this.getStyle())
    }
}

export abstract class CompositeSymbol extends BaseSymbol {
    protected abstract symbols: BaseSymbol[]

    protected getCompositeNode(style: CSSProperties) {
        return (
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-fit"
                style={style}
            >
                {this.symbols.map((symbol, idx) => (
                    <div key={idx}>{symbol.render()}</div>
                ))}
                <div className="w-3 bg-black"></div>
            </div>
        )
    }

    override render(): ReactNode {
        return this.getCompositeNode(this.getStyle())
    }
}
