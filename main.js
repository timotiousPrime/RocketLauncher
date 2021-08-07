import { GAME_MODE, INIT_STATE } from './constants.js'
import {
    explode,
    onWindowVisibilityChange,
    removeCurrentFallingObjects,
    resetRocket,
    rocketLaunch,
    setupInitialDOMRelatedState,
} from './dom.js'
import { setupEventListener } from './EventListeners.js'
import { rain } from './falling.js'
import { renderGame } from './rendering.js'
import { StatefulLogic } from './statefulLogic.js'
import * as mutatorFns from './stateMutators.js'

function runGame() {
    let rainLogic
    const logic = new StatefulLogic({
        onStateUpdate: (prevState, state) => {
            const restartOrResumeRain = () => {
                switch (prevState.gameMode) {
                    case GAME_MODE.GAME_OVER:
                        rainLogic.restart()
                        resetRocket()
                        break
                    case GAME_MODE.PAUSED:
                    case GAME_MODE.INIT:
                        rainLogic.stop()
                        rainLogic.start()
                        break
                    default:
                        break
                }
            }

            if (rainLogic && prevState.gameMode !== state.gameMode) {
                switch (state.gameMode) {
                    case GAME_MODE.PAUSED:
                        rainLogic.pause()
                        break
                    case GAME_MODE.RUNNING:
                        restartOrResumeRain()
                        break
                    case GAME_MODE.GAME_OVER:
                        rainLogic.stop()
                        removeCurrentFallingObjects()
                        break
                    default:
                        break
                }
            }
            if (rainLogic && prevState.score !== state.score) {
                if (prevState.score < state.score) {
                    rocketLaunch()
                    setTimeout(() => {
                        resetRocket()
                    }, 1200)
                }
            }
            if (rainLogic && prevState.livesRemaining > state.livesRemaining) {
                explode()
                if (state.gameMode !== GAME_MODE.GAME_OVER) {
                    setTimeout(() => {
                        resetRocket()
                    }, 1200)
                }
            }
            renderGame(prevState, state)
        },
        getInitState: () => ({ ...INIT_STATE }),
    })

    setupEventListener(logic)

    setupInitialDOMRelatedState(logic)

    onWindowVisibilityChange((isVisible) => {
        if (!isVisible) {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.PAUSED)
        }
    })

    rainLogic = rain(logic)
}

runGame()
