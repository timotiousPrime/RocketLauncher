import { INIT_STATE } from './constants'
import { renderGame } from './rendering'

export class StatefulLogic {
    state

    constructor() {
        this.resetState()
    }

    resetState() {
        this.state = { ...INIT_STATE }
    }

    mutate(mutatorFn, ...args) {
        const nextState = mutatorFn(this.state, ...args)
        renderGame(nextState)
        this.state = nextState
    }
}
