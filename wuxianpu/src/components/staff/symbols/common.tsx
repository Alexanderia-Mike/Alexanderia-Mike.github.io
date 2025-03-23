import { Component, CSSProperties, ReactNode } from 'react'

interface SymbolProps {
    width: number
    x?: number
    y?: number
    x_percent?: number
    y_percent?: number
    additionalStyles?: CSSProperties
}

export abstract class AbstractSymbol extends Component<SymbolProps> {
    protected abstract getImageSource(): string

    protected getImageNode(
        style: CSSProperties,
        className?: string
    ): ReactNode {
        return (
            <img
                className={
                    className ||
                    'absolute -translate-x-1/2 -translate-y-1/2 w-7'
                }
                src={this.getImageSource()}
                style={style}
            />
        )
    }

    protected getStyle(): CSSProperties {
        const style: CSSProperties = {}
        if (this.props.x != undefined) style.left = `${this.props.x}px`
        if (this.props.y != undefined) style.top = `${this.props.y}px`
        if (this.props.x_percent != undefined)
            style.left = `${this.props.x_percent}%`
        if (this.props.y_percent != undefined)
            style.top = `${this.props.y_percent}%`
        style.width =
            this.props.width != undefined ? `${this.props.width}px` : '3rem'
        return { ...style, ...this.props.additionalStyles }
    }

    render(): ReactNode {
        return this.getImageNode(this.getStyle())
    }
}
