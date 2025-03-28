import { NoteName } from '../../../../common/notes-utils/notes'
import { Piano, PianoProps, ReadOnlyKey } from './piano-interface'
import { ReactNode } from 'react'

interface ReadOnlyPianoProps extends PianoProps {
    pressedKeys: NoteName[]
}

export default class ReadOnlyPiano extends Piano<ReadOnlyPianoProps> {
    protected override getKey(
        i: number,
        key: NoteName,
        isWhite: boolean,
        children?: ReactNode
    ) {
        return (
            <ReadOnlyKey
                isPressed={this.props.pressedKeys
                    .map((k) => k.valueOf())
                    .includes(key.valueOf())}
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
