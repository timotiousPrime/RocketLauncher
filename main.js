import { INIT_STATE } from './constants.js'
import { renderGame } from './rendering.js'
import { StatefulLogic } from './statefulLogic.js'

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
