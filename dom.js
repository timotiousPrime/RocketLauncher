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

export function explode(isMuted) {
    if (!explodeEl) return
    explodeEl.classList.add('run')
}

export function resetRocket() {
    if (!explodeEl) return
    explodeEl.classList.remove('run')
    rocketEl.classList.remove('launch')
}
export function rocketLaunch(isMuted) {
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


export function levelUpSound(isMuted) {
    const levelUpSound = document.getElementById(EL_IDS.levelUpSound)
    if (!levelUpSound) return
    levelUpSound.muted = isMuted
    levelUpSound.currentTime = 0
    levelUpSound.play()
}

export function playSoundEffect(element, isMuted) {
    const soundElement = document.getElementById(element)
    if (!soundElement) return 
    soundElement.muted = isMuted
    soundElement.currentTime = 0
    soundElement.play()
    console.log(`${element} was played`)
}