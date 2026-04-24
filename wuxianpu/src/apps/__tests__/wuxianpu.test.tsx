// Factory mock prevents Jest from trying to parse Tone.js's ESM build
jest.mock('tone', () => {
    const mockNode = () => ({
        connect: jest.fn().mockReturnThis(),
        toDestination: jest.fn().mockReturnThis(),
        triggerAttack: jest.fn(),
        triggerRelease: jest.fn(),
        dispose: jest.fn(),
        gain: { value: 1 },
    })
    return {
        Sampler: jest.fn().mockImplementation(mockNode),
        Gain: jest.fn().mockImplementation(mockNode),
        start: jest.fn().mockResolvedValue(undefined),
        loaded: jest.fn().mockResolvedValue(undefined),
        now: jest.fn(() => 0),
    }
})

jest.mock('../../common/utils', () => ({
    randomSelect: jest.fn(),
}))

import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accidental, NoteName, NoteNameBase, WhiteKeyNoteName } from '../../common/notes-utils/notes'
import * as utils from '../../common/utils'
import Wuxianpu from '../wuxianpu'

const makeC4 = () => new NoteName(new WhiteKeyNoteName(NoteNameBase.C, 4), Accidental.NONE)

function getCanvasCtx() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    return canvas.getContext('2d') as jest.Mocked<CanvasRenderingContext2D>
}

beforeEach(() => {
    jest.clearAllMocks()
    // Return a fresh object each call so React sees a state change and re-renders
    ;(utils.randomSelect as jest.Mock).mockImplementation(makeC4)
})

describe('generate note', () => {
    it('clicking the generate button causes the canvas to redraw', () => {
        render(<Wuxianpu />)
        const ctx = getCanvasCtx()
        const strokesBefore = ctx.stroke.mock.calls.length

        act(() => {
            fireEvent.click(screen.getByText('生成练习题'))
        })

        // After generating a note the canvas redraws its staff lines via ctx.stroke
        expect(ctx.stroke.mock.calls.length).toBeGreaterThan(strokesBefore)
    })
})

describe('answer submission', () => {
    it('submitting a correct answer shows the correct feedback message', () => {
        render(<Wuxianpu />)

        // Generate a note first
        act(() => {
            fireEvent.click(screen.getByText('生成练习题'))
        })

        // Submit correct answer — C4 in Helmholtz notation = "c1"
        const input = document.getElementById('noteInput') as HTMLInputElement
        act(() => {
            fireEvent.change(input, { target: { value: 'c1' } })
            fireEvent.click(screen.getByText('提交答案'))
        })

        expect(screen.getByText(/正确✅/)).toBeInTheDocument()
    })

    it('submitting a wrong answer shows the wrong feedback message', () => {
        render(<Wuxianpu />)

        act(() => {
            fireEvent.click(screen.getByText('生成练习题'))
        })

        // Submit wrong answer — D4 in Helmholtz notation = "d"
        const input = document.getElementById('noteInput') as HTMLInputElement
        act(() => {
            fireEvent.change(input, { target: { value: 'd' } })
            fireEvent.click(screen.getByText('提交答案'))
        })

        expect(screen.getByText(/错误❌/)).toBeInTheDocument()
    })
})

describe('auto-generation', () => {
    it('a correct answer triggers the next note after 1 second', async () => {
        // Use userEvent.setup with advanceTimers for proper fake-timer integration
        jest.useFakeTimers()
        const user = userEvent.setup({
            advanceTimers: (delay) => jest.advanceTimersByTime(delay),
        })

        render(<Wuxianpu />)
        const ctx = getCanvasCtx()

        // Enable auto-generate: click the label that wraps the hidden checkbox
        const toggleLabel = document.querySelector('.toggle label.slider') as HTMLElement
        await user.click(toggleLabel)

        // Advance timer: the useEffect sets a 1s timeout that generates the first note
        act(() => { jest.advanceTimersByTime(1000) })

        const strokesAfterFirstNote = ctx.stroke.mock.calls.length

        // Submit correct answer — C4 in Helmholtz = "c1"
        const input = document.getElementById('noteInput') as HTMLInputElement
        await user.type(input, 'c1')
        await user.click(screen.getByText('提交答案'))

        // Correct answer calls triggerNewNote() → useEffect sets another 1s timeout
        act(() => { jest.advanceTimersByTime(1000) })

        // Canvas should have redrawn for the next note
        expect(ctx.stroke.mock.calls.length).toBeGreaterThan(strokesAfterFirstNote)

        jest.useRealTimers()
    })
})
