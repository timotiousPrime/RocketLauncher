import { EL_IDS } from './constants.js'
import * as mutatorFns from './stateMutators.js'
import { pxToPercent } from './utils.js'

export function setupInitialDOMRelatedState(logic) {
    const basketEl = document.getElementById(EL_IDS.basket)
    const playArea = document.getElementById(EL_IDS.playArea)
    const columns = Array.from(
        document.getElementById(EL_IDS.fallingObjectsList).children || [],
    )

    const columnsXPos = columns.map((el) =>
        pxToPercent(el.offsetLeft + el.clientWidth / 2, playArea.clientWidth),
    )

    logic.mutate(mutatorFns.setColumnsXPos, columnsXPos)
    const { x, y, width, height } = basketEl.getBoundingClientRect()
    logic.mutate(mutatorFns.setPlayAreaWidth, playArea.clientWidth)
    logic.mutate(mutatorFns.updateBasket, { xPos: x, yPos: y, width, height })
}

/**
 * @return {(isVisible: boolean) => void
 */
export function onWindowVisibilityChange(callback) {
    let hidden
    let visibilityChange
    if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        hidden = 'hidden'
        visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden'
        visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden'
        visibilityChange = 'webkitvisibilitychange'
    }

    document.addEventListener('visibilitychange', () => {
        callback(!document[hidden])
    })
}

let explodeEl = null
let rocketEl = null
document.addEventListener('DOMContentLoaded', function () {
    explodeEl = document.getElementById('explode')
    rocketEl = document.getElementById('rocket')
})

export function explode() {
    if (!explodeEl) return
    explodeEl.classList.add('run')
}

export function resetRocket() {
    if (!explodeEl) return
    explodeEl.classList.remove('run')
    rocketEl.classList.remove('launch')
}
export function rocketLaunch() {
    if (!rocketEl) return
    rocketEl.classList.remove('launch')
    rocketEl.classList.add('launch')
}

export function removeCurrentFallingObjects() {
    const fallingObjects = document.getElementsByClassName('falling-object')
    Array.from(fallingObjects).forEach((obj) => {
        obj.remove()
    })
}

export function playBackgroundMusic(isMuted, isGameOver) {
    const bgMusic = document.getElementById(EL_IDS.bgMusic)
    const gameOverMusic = document.getElementById(EL_IDS.gameOverMusic)
    if (!bgMusic || !gameOverMusic) return

    const nextGameOverMuted = isMuted || !isGameOver
    const nextBgMusicMuted = isMuted || isGameOver

    if (gameOverMusic.muted !== nextGameOverMuted) {
        gameOverMusic.currentTime = 0
    }

    if (bgMusic.muted !== nextBgMusicMuted) {
        bgMusic.currentTime = 0
    }

    gameOverMusic.muted = nextGameOverMuted
    bgMusic.muted = nextBgMusicMuted

    bgMusic.loop = true
    gameOverMusic.play()
    bgMusic.play()
}

export function playSoundEffect(elementId, isMuted) {
    const soundElement = document.getElementById(elementId)
    if (!soundElement) return
    soundElement.muted = isMuted
    soundElement.currentTime = 0
    soundElement.play()
}
