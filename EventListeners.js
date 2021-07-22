import { GAME_MODE, EL_IDS } from './constants.js'
import * as mutatorFns from './stateMutators.js'
import { pxToPercent } from './utils.js'

export function setupEventListener(logic) {
    const playArea = document.getElementById(EL_IDS.playArea)

    // move basket when left or right key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            logic.mutate(mutatorFns.moveBasketLeft)
        }

        if (e.key === 'ArrowRight') {
            logic.mutate(mutatorFns.moveBasketRight)
        }
    })

    // move basket when mouse is used
    playArea.addEventListener('mousemove', (e) => {
        let xPos = pxToPercent(e.x, playArea.clientWidth)
        logic.mutate(mutatorFns.updateBasket, { xPos })
    })

    // listen when p/enter/space/esc is pressed
    document.addEventListener('keydown', (e) => {
        if (
            (logic.state.gameMode === GAME_MODE.RUNNING && e.key === 'p') ||
            (logic.state.gameMode === GAME_MODE.RUNNING && e.key === ' ') ||
            (logic.state.gameMode === GAME_MODE.RUNNING &&
                e.key === 'Escape') ||
            (logic.state.gameMode === GAME_MODE.RUNNING && e.key === 'Pause')
        ) {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.PAUSED)
        }

        // Listen for when enter is pressed when game is paused, to resume game
        if (logic.state.gameMode === GAME_MODE.PAUSED && e.key === 'Enter') {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.RUNNING)
        }
    })

    // listen for when restart is clicked
    const restartBtn = document.getElementById(EL_IDS.restartBtn)

    restartBtn.addEventListener('click', () => {
        const fallingObjs = document.querySelectorAll('.falling-object')
        fallingObjs.forEach((fallingObj) => {
            fallingObj.remove()
        })

        logic.mutate(mutatorFns.restartGame)
    })

    const pauseBtn = document.getElementById(EL_IDS.pauseBtn)

    pauseBtn.addEventListener('click', () => {
        logic.mutate(mutatorFns.toggleGamePause)
    })
}

// listen for when play is clicked
// will add when buttons for this functionality are added

// listen for when pause is clicked
// will add when buttons for this functionality are added
