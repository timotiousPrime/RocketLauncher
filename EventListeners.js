import { GAME_MODE, EL_IDS } from './constants.js'
import * as mutatorFns from './stateMutators.js'

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
        let xPos = (e.x / playArea.clientWidth) * 100
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

            // console.log(
            //     'The game was running and has been paused with the ' +
            //         e.key +
            //         ' key',
            // )
        }

        // Listen for when enter is pressed when game is paused, to resume game
        if (logic.state.gameMode === GAME_MODE.PAUSED && e.key === 'Enter') {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.RUNNING)

            // console.log(
            //     'The game was paused and has been resumed with the ' +
            //         e.key +
            //         ' key',
            // )
        }
    })
}

// listen for when play is clicked
// will add when buttons for this functionality are added

// listen for when pause is clicked
// will add when buttons for this functionality are added
