import { GAME_MODE } from "./constants";
import * as mutatorFns from './stateMutators.js'

function setupEventListener(logic) {
    // move basket when left or right key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            logic.mutate(mutatorFns.moveBasketLeft, 5)
            // console.log('Left key was pressed')
        }

        if (e.key === 'ArrowRight') {
            logic.mutate(mutatorFns.moveBasketRight, 5)
            // console.log('Right key was pressed')
        }
    })

    // move basket when mouse is used
    const playArea = document.querySelector('.play-area')

    playArea.addEventListener('mousemove', (e) => {
        let xPos = e.clientX - basket.width / 2
        console.log('mouse is on x pixel ' + xPos) // currently xPos is NaN because it doesn't know what basket is
        logic.mutate(mutatorFns.setBasketPos, xPos)
    })

    // listen when p/enter/space/esc is pressed
    document.addEventListener('keydown', (e) => {
        if (
            (GAME_MODE === 'running' && e.key === 'p') ||
            (GAME_MODE === 'running' && e.key === ' ') ||
            (GAME_MODE === 'running' && e.key === 'Escape') ||
            (GAME_MODE === 'running' && e.key === 'Pause')
        ) {
            logic.mutate(mutatorFns.setGameMode, 'pause')
            // console.log(
            //     'The game was running and has been paused with the ' +
            //         e.key +
            //         ' key',
            // )
        }

        // Listen for when enter is pressed when game is paused, to resume game
        if (GAME_MODE === 'paused' && e.key === 'Enter') {
            logic.mutate(mutatorFns.setGameMode, 'running')

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
