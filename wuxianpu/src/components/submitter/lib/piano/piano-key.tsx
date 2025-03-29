import clsx from 'clsx'
import { ReactNode, Component } from 'react'
import {
    ALL_WHITE_KEYS,
    NoteName,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { PitchNotation } from '../../../../common/notes-utils/pitch-notation'

export interface PianoKeyProps {
    idx: number
    note: NoteName
    isCorrect: boolean
    isPressed: boolean
    isWhite: boolean
    showColor: boolean
    resizable: boolean
    children?: ReactNode
    grayed?: boolean
    displayNotes?: PitchNotation
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
                <div className="w-full h-full flex flex-col justify-end items-center">
                    {this.props.displayNotes &&
                        this.props.isWhite &&
                        this.props.note.toString(this.props.displayNotes)}
                </div>
            </div>
        )
    }
}
interface ReadOnlyKeyProps extends PianoKeyProps {}

export class ReadOnlyKey extends PianoKey<ReadOnlyKeyProps, PianoKeyStates> {
    constructor(props: ReadOnlyKeyProps) {
        super(props)
        this.state = { isPressed: props.isPressed }
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
        this.state = { isPressed: props.isPressed }
    }
    componentDidUpdate(prevProps: PlayableKeyProps) {
        if (prevProps.isPressed !== this.props.isPressed) {
            this.setState({ isPressed: this.props.isPressed })
        }
    }
    protected override getClassNames(): string {
        return clsx(
            super.getClassNames(),
            'cursor-pointer',
            this.props.isWhite
                ? 'white-key'
                : 'black-key hover:bg-gray-500 active:bg-gray-400',
            !this.props.resizable && this.props.isWhite && 'min-w-7'
        )
    }
    private onPress = (event: React.MouseEvent | React.TouchEvent) => {
        // TODO: play sound
        event.stopPropagation()
        this.props.onPress(this)
        // this.setState({ isPressed: true })
    }
    private onRelease = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation()
        // this.setState({ isPressed: false })
    }
    override render(): ReactNode {
        return (
            <div
                onMouseDown={this.onPress}
                onTouchStart={this.onPress}
                onMouseUp={this.onRelease}
                onTouchEnd={this.onRelease}
            >
                {super.render()}
            </div>
        )
    }
}
export const whiteKeys: WhiteKeyNoteName[] = ALL_WHITE_KEYS
