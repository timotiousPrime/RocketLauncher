export class StatefulLogic {
    state
    getInitState
    onStateUpdate

    constructor(dependencies) {
        this.getInitState = dependencies.getInitState
        this.onStateUpdate = dependencies.onStateUpdate
        this.resetState()
    }

    resetState() {
        this.state = this.getInitState()
    }

    mutate(mutatorFn, ...args) {
        const nextState = mutatorFn(this.state, ...args)
        this.onStateUpdate(nextState)
        this.state = nextState
    }
}
