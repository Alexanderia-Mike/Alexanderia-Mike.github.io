import clsx from 'clsx'
import {
    ALL_WHITE_KEYS,
    NoteName,
    NoteNameBase,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { Component, ReactNode } from 'react'

export interface PianoKeyProps {
    idx: number
    note: NoteName
    isCorrect: boolean
    isWhite: boolean
    children?: ReactNode
    grayed?: boolean
}

interface PianoKeyStates {
    isPressed: boolean
}

export abstract class PianoKey<
    T1 extends PianoKeyProps,
    T2 extends PianoKeyStates
> extends Component<T1, T2> {
    protected getClassNames(): string {
        return this.props.isWhite
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
    }
    protected colorStyle(): React.CSSProperties {
        console.log(
            `note = ${
                this.props.note
            }, value = ${this.props.note.valueOf()}, correct = ${
                this.props.isCorrect
            }; pressed = ${this.state.isPressed}`
        )
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
            <div className={this.getClassNames()} style={this.colorStyle()}>
                {this.props.children}
            </div>
        )
    }
}

interface ReadOnlyKeyProps extends PianoKeyProps {
    isPressed: boolean
}

export class ReadOnlyKey extends PianoKey<ReadOnlyKeyProps, PianoKeyStates> {
    constructor(props: ReadOnlyKeyProps) {
        super(props)
        this.state = {
            isPressed: props.isPressed,
        }
    }
}

interface PlayableKeyProps extends PianoKeyProps {
    onPress: () => void
}

export class PlayableKey extends PianoKey<PlayableKeyProps, PianoKeyStates> {
    constructor(props: PlayableKeyProps) {
        super(props)
        this.state = {
            isPressed: false,
        }
    }
    protected override getClassNames(): string {
        return super.getClassNames() + 'cursor-pointer' + this.props.isWhite
            ? 'hover:bg-gray-200 active:bg-gray-300'
            : 'hover:bg-gray-500 active:bg-gray-400'
    }
    private onPress = () => {
        // TODO: play sound
        this.props.onPress()
        this.setState({ isPressed: true })
    }
    private onRelease = () => {
        this.setState({ isPressed: false })
    }
    override render(): ReactNode {
        return (
            <div
                className={this.getClassNames()}
                style={this.colorStyle()}
                onMouseDown={this.onPress}
                onMouseUp={this.onRelease}
            >
                {this.props.children}
            </div>
        )
    }
}

export function followingBlackKey(key: WhiteKeyNoteName, i: number) {
    return (
        ['d', 'e', 'g', 'a', 'b'].includes(
            NoteNameBase[key.noteNameBase][0].toLowerCase()
        ) && i != 0
    )
}

export const whiteKeys: WhiteKeyNoteName[] = ALL_WHITE_KEYS
