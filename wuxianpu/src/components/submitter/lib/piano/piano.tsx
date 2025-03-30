import clsx from 'clsx'
import {
    Accidental,
    ALL_WHITE_KEYS,
    NoteName,
} from '../../../../common/notes-utils/notes'
import { Component, createRef, ReactNode, RefObject } from 'react'
import { followingBlackKey } from './utils'
import './piano.css'
import { PitchNotation } from '../../../../common/notes-utils/pitch-notation'
import { handleScroll } from '../scroll-handler'

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

    private containerRef = createRef<HTMLDivElement>()
    private wrapperRef = createRef<HTMLDivElement>()
    private scrollBarRef = createRef<HTMLDivElement>()
    private scrollThumbRef = createRef<HTMLDivElement>()

    componentDidMount(): void {
        if (!this.props.resizable) {
            if (
                this.containerRef.current &&
                this.wrapperRef.current &&
                this.scrollBarRef.current &&
                this.scrollThumbRef.current
            ) {
                handleScroll(
                    this.containerRef.current,
                    this.wrapperRef.current,
                    this.scrollBarRef.current,
                    this.scrollThumbRef.current
                )
            } else {
                throw Error('reference not attached!')
            }
        }
    }

    override render(): ReactNode {
        return (
            <div
                ref={this.containerRef}
                className={clsx(
                    'flex relative',
                    this.props.resizable && 'justify-center',
                    !this.props.resizable &&
                        'piano flex-col justify-start items-center h-[300px] overflow-hidden'
                )}
            >
                <div
                    ref={this.scrollBarRef}
                    className={clsx(
                        'w-2/3 h-16 bg-custom-bg relative rounded-xl',
                        this.props.resizable && 'hidden'
                    )}
                >
                    <div
                        ref={this.scrollThumbRef}
                        className="h-full absolute bg-slate-400 w-20 rounded-xl"
                    ></div>
                </div>
                <div
                    ref={this.wrapperRef}
                    className={clsx(
                        'h-full flex',
                        this.props.resizable && 'w-full justify-center',
                        !this.props.resizable &&
                            'w-fit items-start absolute top-20'
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
