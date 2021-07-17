import { renderGame } from './rendering'
import { StatefulLogic } from './statefulLogic'
import { INIT_STATE } from './constants'

function runGame() {
    const logic = new StatefulLogic({
        onStateUpdate: renderGame,
        getInitState: () => ({ ...INIT_STATE }),
    })

    // TODO: Set up event hanlders
    // setupEventHandlers(logic)

    // TODO: Start rain
    // rain(logic)
}
