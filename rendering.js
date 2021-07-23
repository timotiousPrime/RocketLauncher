import { EL_IDS, GAME_MODE } from './constants.js'
import { pxToPercent } from './utils.js'

const toPx = (value) => `${value}px`
const toPercent = (value) => `${value}%`

// __This is the main render function which delegates control to the more-specific render functions.__
export function renderGame(state) {
    renderFallingObjects(state)
    renderLivesRemaining(state)
    renderBasketValue(state)
    renderOverlay(state)
    renderBasket(state)
    renderScore(state)
    renderLevel(state)
}

function renderOverlay(state) {
    const overlay = document.getElementById(EL_IDS.overlay)
    if (overlay) {
        overlay.style.display =
            state.gameMode !== GAME_MODE.RUNNING ? 'block' : 'none'
    }

    const overlayTextEls = {
        [GAME_MODE.INIT]: document.getElementById(EL_IDS.overlayTextStart),
        [GAME_MODE.PAUSED]: document.getElementById(EL_IDS.overlayTextPause),
        [GAME_MODE.GAME_OVER]: document.getElementById(
            EL_IDS.overlayTextGameOver,
        ),
    }

    for (const [gameMode, textEl] of Object.entries(overlayTextEls)) {
        if (!textEl) {
            continue
        }
        textEl.style.display = state.gameMode === gameMode ? 'block' : 'none'
    }
}

function renderBasket({ basket }) {
    const basketDiv = document.getElementById(EL_IDS.basket)
    const playArea = document.getElementById(EL_IDS.playArea)

    // Basket width in % value
    let halfOfBasket = pxToPercent(basket.width, playArea.clientWidth) / 2

    // Gets the of the basket in % value
    let leftOffSetPercent = basket.xPos
    if (leftOffSetPercent < 0) {
        leftOffSetPercent = 0
    } else if (leftOffSetPercent >= 100 - halfOfBasket * 2) {
        leftOffSetPercent = 100 - halfOfBasket * 2
    }

    basketDiv.style.left = toPercent(leftOffSetPercent) // setting the xPos to a percentage
    basketDiv.style.width = toPx(basket.width)
    basketDiv.style.height = toPx(basket.height)
}

function renderBasketValue({ basket }) {
    const basketEl = document.getElementById(EL_IDS.basketValue)
    if (+basketEl.innerText !== +basket.basketValue) {
        basketEl.innerText = basket.basketValue
    }
}

function renderScore({ score }) {
    const scoreEl = document.getElementById(EL_IDS.scoreValue)
    if (+scoreEl.textContent !== +score) {
        console.log('score ', score)
        scoreEl.textContent = score
    }
}

function renderLevel({ gameLevel }) {
    const levelEl = document.getElementById(EL_IDS.levelValue)
    levelEl.textContent = gameLevel
}

function renderLivesRemaining({ livesRemaining }) {
    const livesRemainingEl = document.getElementById(EL_IDS.livesRemaining)
    livesRemainingEl.textContent = livesRemaining
}

function renderFallingObjects({ fallingObjects }) {
    const fallingObjectColumnEls = Array.from(
        document.getElementById(EL_IDS.fallingObjectsList).children,
    )

    Object.values(fallingObjects).forEach((fallingObject) => {
        let fallingObjectEl = document.getElementById(fallingObject.id)
        if (fallingObjectEl) {
            fallingObjectEl.style.top = toPx(fallingObject.yPos)
            return
        }

        const fallingObjectColumnEl =
            fallingObjectColumnEls[fallingObject.columnIndex]

        fallingObjectEl = document.createElement('span')
        const numeratorEl = document.createElement('span')
        const denominatorEl = document.createElement('span')
        fallingObjectEl.classList.add('falling-object')
        fallingObjectEl.id = fallingObject.id
        numeratorEl.classList.add('falling-object-numerator')
        denominatorEl.classList.add('falling-object-denominator')
        numeratorEl.textContent = fallingObject.numerator
        denominatorEl.textContent = fallingObject.denominator

        fallingObjectEl.appendChild(numeratorEl)
        fallingObjectEl.appendChild(denominatorEl)
        fallingObjectColumnEl.appendChild(fallingObjectEl)

        fallingObjectEl.style.width = toPx(fallingObject.width)
        fallingObjectEl.style.height = toPx(fallingObject.height)
    })
}
