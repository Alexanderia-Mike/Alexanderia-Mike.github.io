import clsx from 'clsx'
import { ReactNode, Component } from 'react'
import {
    ALL_WHITE_KEYS,
    NoteName,
    WhiteKeyNoteName,
} from '../../../../common/notes-utils/notes'
import { PitchNotation } from '../../../../common/notes-utils/pitch-notation'
import * as Tone from 'tone'
import { getSampler, noteToSampleId } from './piano-audios'

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
        return clsx(
            this.props.isWhite
                ? clsx(
                      'relative flex flex-grow max-w-5 border-r h-full',
                      this.props.grayed && 'border-gray-300',
                      !this.props.grayed && 'border-black',
                      this.props.idx == 0 && 'border-l'
                  )
                : clsx(
                      'w-2/3 h-2/3 absolute -translate-x-1/2 z-10',
                      this.props.grayed && 'bg-gray-300',
                      !this.props.grayed && 'bg-black'
                  ),
            'rounded-b-md border-y'
        )
    }
    protected colorStyle(): React.CSSProperties {
        if (!this.props.showColor) {
            return {}
        }
        const isPressed = this.props.isPressed || this.state.isPressed
        return this.props.isCorrect && isPressed
            ? { backgroundColor: '#7CFC00' }
            : this.props.isCorrect
            ? { backgroundColor: 'yellow' }
            : isPressed
            ? { backgroundColor: 'red' }
            : {}
    }
    override render(): ReactNode {
        return (
            <div className={this.getClassNames()} style={this.colorStyle()}>
                {this.props.children}
                <div className="w-full h-full flex flex-col justify-end items-center">
                    <span>
                        {this.props.displayNotes &&
                            this.props.isWhite &&
                            this.props.note.toString(this.props.displayNotes)}
                    </span>
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
}
interface PlayableKeyProps extends PianoKeyProps {
    onPress: (k: PlayableKey) => void
}

export class PlayableKey extends PianoKey<PlayableKeyProps, PianoKeyStates> {
    private sampler = getSampler()
    constructor(props: PlayableKeyProps) {
        super(props)
        this.state = { isPressed: props.isPressed }
    }
    componentDidMount(): void {
        const initializeTone = async () => {
            await Tone.start()
            await Tone.loaded()
        }
        initializeTone()
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
    private onPress = async (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({ isPressed: true })
        this.sampler.triggerAttack(noteToSampleId(this.props.note))
        this.props.onPress(this)
    }
    private onRelease = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({ isPressed: false })
        this.sampler.triggerRelease(noteToSampleId(this.props.note))
    }
    override render(): ReactNode {
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0
        return (
            <div
                onMouseDown={isTouchDevice ? undefined : this.onPress}
                onMouseUp={isTouchDevice ? undefined : this.onRelease}
                onMouseLeave={isTouchDevice ? undefined : this.onRelease}
                onTouchStart={isTouchDevice ? this.onPress : undefined}
                onTouchEnd={isTouchDevice ? this.onRelease : undefined}
            >
                {super.render()}
            </div>
        )
    }
}
export const whiteKeys: WhiteKeyNoteName[] = ALL_WHITE_KEYS
