import { GAME_MODE, INIT_STATE } from './constants.js'
import { onWindowVisibilityChange, setupInitialDOMRelatedState } from './dom.js'
import { setupEventListener } from './EventListeners.js'
import { rain } from './falling.js'
import { renderGame } from './rendering.js'
import { StatefulLogic } from './statefulLogic.js'
import * as mutatorFns from './stateMutators.js'

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
            renderGame(state)
        },
        getInitState: () => ({ ...INIT_STATE }),
    })

    // TODO: Set up event hanlders
    setupEventListener(logic)

    setupInitialDOMRelatedState(logic)

    onWindowVisibilityChange((isVisible) => {
        if (isVisible) {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.RUNNING)
        } else {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.PAUSED)
        }
    })

    // TODO: Start rain
    rainLogic = rain(logic)
}

runGame()
