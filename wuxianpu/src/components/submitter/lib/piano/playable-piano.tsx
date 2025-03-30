import { NoteName } from '../../../../common/notes-utils/notes'
import { Piano, PianoProps, PianoStates } from './piano'
import { PlayableKey } from './piano-key'
import { ReactNode } from 'react'

interface PlayablePianoProps extends PianoProps {
    onPress: (k: PlayableKey) => void
}

interface PlayablePianoStates extends PianoStates {
    pressedKeys: PlayableKey[]
}

export default class PlayablePiano extends Piano<
    PlayablePianoProps,
    PlayablePianoStates
> {
    constructor(props: PlayablePianoProps) {
        super(props)
        this.state = { pressedKeys: [] }
    }

    onPress = (k: PlayableKey) => {
        this.setState({ pressedKeys: [k] })
        this.props.onPress(k)
    }

    protected override getKey(
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ) {
        return (
            <PlayableKey
                onPress={this.onPress}
                idx={i}
                key={i}
                note={key}
                resizable={this.props.resizable}
                isCorrect={this.props.correctKeys
                    .map((k) => k.valueOf())
                    .includes(key.valueOf())}
                isPressed={this.state.pressedKeys
                    .map((k) => k.props.note.valueOf())
                    .includes(key.valueOf())}
                isWhite={isWhite}
                showColor={this.props.showColor}
                grayed={this.props.grayed}
                children={children}
                displayNotes={this.props.displayNotes}
            />
        )
    }
}
