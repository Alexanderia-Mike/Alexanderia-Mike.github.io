import { NoteName } from '../../../../common/notes-utils/notes'
import { Piano, PianoProps, PlayableKey } from './piano-interface'
import { ReactNode } from 'react'

interface PlayablePianoProps extends PianoProps {
    onPress: (k: PlayableKey) => void
}

export default class PlayablePiano extends Piano<PlayablePianoProps> {
    protected override getKey(
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ) {
        return (
            <PlayableKey
                onPress={this.props.onPress}
                idx={i}
                key={i}
                note={key}
                resizable={this.props.resizable}
                isCorrect={this.props.correctKeys
                    .map((k) => k.valueOf())
                    .includes(key.valueOf())}
                isWhite={isWhite}
                showColor={this.props.showColor}
                grayed={this.props.grayed}
                children={children}
            />
        )
    }
}
