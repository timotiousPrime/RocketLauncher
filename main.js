import { renderGame } from './rendering'
import { StatefulLogic } from './statefulLogic'
import { INIT_STATE } from './constants'
import { setupEventListener } from './EventListeners'

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
