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
document.addEventListener('DOMContentLoaded', function () {
    explodeEl = document.getElementById('explode')
})

export function explode() {
    if (!explodeEl) return
    explodeEl.classList.add('run')
}

export function resetRocket() {
    if (!explodeEl) return
    explodeEl.classList.remove('run')
}

export function removeCurrentFallingObjects() {
    const fallingObjects = document.getElementsByClassName('falling-object')
    Array.from(fallingObjects).forEach((obj) => {
        obj.remove()
    })
}
