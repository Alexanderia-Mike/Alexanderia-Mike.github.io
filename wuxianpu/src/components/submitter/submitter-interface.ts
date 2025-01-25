import { NoteName } from '../../common/common'

export interface SubmitterInterface {
    currentNoteName: NoteName | undefined
    incrementCorrect: () => void
    incrementTotal: () => void
}
