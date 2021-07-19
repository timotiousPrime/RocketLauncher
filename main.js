import { GAME_MODE, INIT_STATE } from './constants.js'
import { setupInitialDOMRelatedState } from './dom.js'
import { setupEventListener } from './EventListeners.js'
import { rain } from './falling.js'
import { renderGame } from './rendering.js'
import { StatefulLogic } from './statefulLogic.js'

function runGame() {
    let rainLogic
    const logic = new StatefulLogic({
        onStateUpdate: (oldState, state) => {
            if (rainLogic && oldState.gameMode !== state.gameMode) {
                switch (state.gameMode) {
                    case GAME_MODE.PAUSED:
                        rainLogic.pause()
                        break
                    case GAME_MODE.RUNNING:
                        rainLogic.resume()
                        break
                    case GAME_MODE.GAME_OVER:
                        rainLogic.stop()
                        break
                    default:
                        break
                }
            }
            if (rainLogic) {
            }
            renderGame(state)
        },
        getInitState: () => ({ ...INIT_STATE }),
    })

    // TODO: Set up event hanlders
    setupEventListener(logic)

    setupInitialDOMRelatedState(logic)

    // TODO: Start rain
    rainLogic = rain(logic)
}

runGame()
