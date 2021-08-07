import { EL_IDS, GAME_MODE } from './constants.js'
import * as mutatorFns from './stateMutators.js'
import { pxToPercent } from './utils.js'

export function setupEventListener(logic) {
    const playArea = document.getElementById(EL_IDS.playArea)

    // move basket when left or right key is pressed
    document.addEventListener('keydown', (e) => {
        const basketEl = document.getElementById(EL_IDS.basket)
        if (e.key === 'ArrowLeft') {
            basketEl.style.transitionDuration = '.1s'
            logic.mutate(mutatorFns.moveBasketLeft)
            setTimeout(() => {
                basketEl.style.transitionDuration = '0s'
            }, 150)
        }

        if (e.key === 'ArrowRight') {
            basketEl.style.transitionDuration = '.1s'
            logic.mutate(mutatorFns.moveBasketRight)
            setTimeout(() => {
                basketEl.style.transitionDuration = '0s'
            }, 150)
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
            logic.state.gameMode === GAME_MODE.RUNNING &&
            ['p', ' ', 'Escape', 'Pause'].includes(e.key)
        ) {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.PAUSED)
        }

        // Listen for when enter is pressed to begin game
        if (GAME_MODE.INIT === logic.state.gameMode && e.key === 'Enter') {
            logic.mutate(mutatorFns.startGame)
        }

        // Listen for when enter is pressed when game is paused, to resume game
        if (GAME_MODE.PAUSED === logic.state.gameMode && e.key === 'Enter') {
            logic.mutate(mutatorFns.setGameMode, GAME_MODE.RUNNING)
        }

        // Listen for when enter is pressed when game is stopped, to start game
        if (logic.state.gameMode === GAME_MODE.GAME_OVER && e.key === 'Enter') {
            logic.mutate(mutatorFns.restartGame)
        }
    })

    // Fix this
    // listen for when restart is clicked
    const restartBtn = document.getElementById(EL_IDS.restartBtn)
    restartBtn.addEventListener('click', () => {
        // Button functions as a "New game" button before game starts
        if (logic.state.gameMode === GAME_MODE.INIT) {
            logic.mutate(mutatorFns.startGame)
        } else {
            const fallingObjs = document.querySelectorAll('.falling-object')
            fallingObjs.forEach((fallingObj) => {
                fallingObj.remove()
            })

            logic.mutate(mutatorFns.restartGame)
        }

        restartBtn.blur() // prevents the focus on the button
    })

    const pauseBtn = document.getElementById(EL_IDS.pauseBtn)
    pauseBtn.addEventListener('click', () => {
        // Button is a no-op unless game is running
        if (
            [GAME_MODE.RUNNING, GAME_MODE.PAUSED].includes(logic.state.gameMode)
        ) {
            logic.mutate(mutatorFns.toggleGamePause)
        }
        pauseBtn.blur() // prevents the focus on the button
    })

    const muteBtn = document.getElementById(EL_IDS.muteBtn)
    muteBtn.addEventListener('click', () => {
        logic.mutate(mutatorFns.toggleMute)
        muteBtn.blur() // prevents the focus on the button
    })
}
