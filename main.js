import { INIT_STATE } from './constants.js'
import { setupEventListener } from './EventListeners.js'
import { renderGame } from './rendering.js'
import { StatefulLogic } from './statefulLogic.js'

function runGame() {
    const logic = new StatefulLogic({
        onStateUpdate: renderGame,
        getInitState: () => ({ ...INIT_STATE }),
    })

    // TODO: Set up event hanlders
    setupEventListener(logic)

    // TODO: Start rain
    // rain(logic)
}
