import { WhiteKeyNoteName } from '../../common/common'

export interface SubmitterInterface {
    currentNoteName: WhiteKeyNoteName | undefined
    incrementCorrect: () => void
    incrementTotal: () => void
}
