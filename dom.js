import { EL_IDS } from './constants.js'
import * as mutatorFns from './stateMutators.js'

export function setupInitialDOMRelatedState(logic) {
    const basketEl = document.getElementById(EL_IDS.basket)

    const { x, y, width, height } = basketEl.getBoundingClientRect()
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

export function playBackgroundMusic(isMuted) {
    const bgMusic = document.getElementById(EL_IDS.bgMusic)
    if (!bgMusic) return
    bgMusic.muted = isMuted
    // bgMusic.currentTime = 0
    bgMusic.loop = true
    bgMusic.play()
    bgMusic.classList.add('musicPlaying')
}

export function movingBasketSound(isMuted) {
    const basketSound = document.getElementById(EL_IDS.basketSound)
    if (!basketSound) return
    basketSound.muted = isMuted
    basketSound.currentTime = 0
    basketSound.play()
}

export function rocketTakeOffSound(isMuted) {
    const rocketTakeOffSound = document.getElementById(EL_IDS.rocketTakeOffSound)
    if (!rocketTakeOffSound) return
    rocketTakeOffSound.muted = isMuted
    rocketTakeOffSound.currentTime = 0
    rocketTakeOffSound.play()
}

export function rocketExplodeSound(isMuted) {
    const lifeLostSound = document.getElementById(EL_IDS.lifeLostSound)
    if (!lifeLostSound) return
    lifeLostSound.muted = isMuted
    lifeLostSound.currentTime = 0
    lifeLostSound.play()
}


export function levelUpSound(isMuted) {
    const levelUpSound = document.getElementById(EL_IDS.levelUpSound)
    if (!levelUpSound) return
    levelUpSound.muted = isMuted
    levelUpSound.currentTime = 0
    levelUpSound.play()
}

export function SpawnFallingObjectSound(isMuted) {
    const spawnFallingObjectSound = document.getElementById(EL_IDS.spawnFallingObjectSound)
    if (!spawnFallingObjectSound) return
    spawnFallingObjectSound.muted = isMuted
    spawnFallingObjectSound.currentTime = 0
    spawnFallingObjectSound.play()
}

export function catchFallingObjectSound(isMuted) {
    const catchFallingObjectSound = document.getElementById(EL_IDS.catchFallingObjectSound)
    if (!catchFallingObjectSound) return
    catchFallingObjectSound.muted = isMuted
    catchFallingObjectSound.currentTime = 0
    catchFallingObjectSound.play()
}

export function gameOverSound(isMuted) {
    const gameOverMusic = document.getElementById(EL_IDS.gameOverMusic)
    if (!gameOverMusic) return
    gameOverMusic.muted = isMuted
    gameOverMusic.currentTime = 0
    gameOverMusic.play()
}