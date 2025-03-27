import clsx from 'clsx'
import {
    ALL_WHITE_KEYS,
    NoteName,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { Component, ReactNode } from 'react'

export interface PianoKeyProps {
    idx: number
    note: NoteName
    isCorrect: boolean
    children: ReactNode
    isWhite: boolean
    grayed?: boolean
}

interface PianoKeyStates {
    isPressed: boolean
}

export abstract class PianoKey<
    T1 extends PianoKeyProps,
    T2 extends PianoKeyStates
> extends Component<T1, T2> {
    protected classNames: string = this.props.isWhite
        ? clsx(
              'relative flex flex-grow max-w-5 border-r border-y h-full',
              this.props.grayed && 'border-gray-300',
              !this.props.grayed && 'border-black',
              this.props.idx == 0 && 'border-l'
          )
        : clsx(
              'w-2/3 h-2/3 absolute -translate-x-1/2 z-10',
              this.props.grayed && 'bg-gray-300',
              !this.props.grayed && 'bg-black'
          )
    protected colorStyle(): React.CSSProperties {
        return this.props.isCorrect && this.state.isPressed
            ? { backgroundColor: '#7CFC00' }
            : this.props.isCorrect
            ? { backgroundColor: 'yellow' }
            : this.state.isPressed
            ? { backgroundColor: 'red' }
            : {}
    }
    override render(): ReactNode {
        return (
            <div className={this.classNames} style={this.colorStyle()}>
                {this.props.children}
            </div>
        )
    }
}

interface BlackKeyProps extends PianoKeyProps {}
interface BlackKeyStates extends PianoKeyStates {}

interface WhiteKeyProps extends PianoKeyProps {
    followingBlackKey: boolean
}
interface WhiteKeyStates extends PianoKeyStates {}

export class BlackKey extends PianoKey<BlackKeyProps, BlackKeyStates> {
    protected override classNames: string = clsx(
        'w-2/3 h-2/3 absolute -translate-x-1/2 z-10',
        this.props.grayed && 'bg-gray-300',
        !this.props.grayed && 'bg-black'
    )
}

export class WhiteKey extends PianoKey<WhiteKeyProps, WhiteKeyStates> {
    protected override classNames = clsx(
        'relative flex flex-grow max-w-5 border-r border-y h-full',
        this.props.grayed && 'border-gray-300',
        !this.props.grayed && 'border-black',
        this.props.idx == 0 && 'border-l'
    )
}

export const whiteKeys: WhiteKeyNoteName[] = ALL_WHITE_KEYS
