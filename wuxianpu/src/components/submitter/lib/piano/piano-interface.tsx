import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { Component, ReactNode } from 'react'
import { followingBlackKey } from './utils'
import './piano-scrollbar.css'

export interface PianoKeyProps {
    idx: number
    note: NoteName
    isCorrect: boolean
    isWhite: boolean
    showColor: boolean
    resizable: boolean
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
        if (!this.props.showColor) {
            return {}
        }
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
    componentDidUpdate(prevProps: ReadOnlyKeyProps) {
        if (prevProps.isPressed !== this.props.isPressed) {
            this.setState({ isPressed: this.props.isPressed })
        }
    }
}

interface PlayableKeyProps extends PianoKeyProps {
    onPress: (k: PlayableKey) => void
}

export class PlayableKey extends PianoKey<PlayableKeyProps, PianoKeyStates> {
    constructor(props: PlayableKeyProps) {
        super(props)
        this.state = {
            isPressed: false,
        }
    }
    protected override getClassNames(): string {
        return clsx(
            super.getClassNames(),
            'cursor-pointer',
            this.props.isWhite
                ? 'hover:bg-gray-200 active:bg-gray-300'
                : 'hover:bg-gray-500 active:bg-gray-400',
            !this.props.resizable && this.props.isWhite && 'min-w-7'
        )
    }
    private onPress = () => {
        // TODO: play sound
        this.props.onPress(this)
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
                onTouchStart={this.onPress}
                onMouseUp={this.onRelease}
                onTouchEnd={this.onRelease}
            >
                {this.props.children}
            </div>
        )
    }
}

export interface PianoProps {
    correctKeys: NoteName[]
    resizable: boolean // if true, piano will be scrollable when the window is small
    showColor: boolean
    grayed?: boolean
}

export abstract class Piano<T extends PianoProps> extends Component<T> {
    protected abstract getKey(
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ): ReactNode

    correctKeyValues = this.props.correctKeys.map((k) => k.valueOf())
    override render(): ReactNode {
        return (
            <div
                className={clsx(
                    'flex justify-center relative',
                    this.props.resizable && 'h-14 sm:h-20 md:h-24 lg:h-32',
                    !this.props.resizable &&
                        'm-auto overflow-x-scroll h-44 piano'
                )}
            >
                {ALL_WHITE_KEYS.map((key, i) =>
                    this.getKey(
                        i,
                        new NoteName(key),
                        true,
                        followingBlackKey(key, i)
                            ? this.getKey(
                                  i,
                                  new NoteName(key, Accidental.FLAT),
                                  false
                              )
                            : undefined
                    )
                )}
            </div>
        )
    }
}

export const whiteKeys: WhiteKeyNoteName[] = ALL_WHITE_KEYS
