export class StatefulLogic {
    state
    getInitState
    onStateUpdate

    constructor(dependencies) {
        this.getInitState = dependencies.getInitState
        this.onStateUpdate = dependencies.onStateUpdate
        this.resetState()
        window.stateLogic = this // for debugging puroses
    }

    resetState() {
        this.state = this.getInitState()
    }

    mutate(mutatorFn, ...args) {
        const oldState = { ...this.state }
        Object.freeze(oldState) // Now... old state will never be mutated
        const nextState = mutatorFn(oldState, ...args)
        this.onStateUpdate(oldState, nextState)
        this.state = nextState
    }
}
