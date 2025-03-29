import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { Component, ReactNode } from 'react'
import { followingBlackKey } from './utils'
import './piano.css'
import { PitchNotation } from '../../../../common/notes-utils/pitch-notation'

export interface PianoProps {
    correctKeys: NoteName[]
    resizable: boolean // if true, piano will be scrollable when the window is small
    showColor: boolean
    displayNotes?: PitchNotation
    grayed?: boolean
}

export interface PianoStates {}

export abstract class Piano<
    T1 extends PianoProps,
    T2 extends PianoStates
> extends Component<T1, T2> {
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
                    !this.props.resizable && 'overflow-x-scroll h-44 piano'
                )}
            >
                <div
                    className={clsx(
                        'h-full flex',
                        this.props.resizable && 'w-full justify-center',
                        !this.props.resizable && 'max-w-full'
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
            </div>
        )
    }
}
