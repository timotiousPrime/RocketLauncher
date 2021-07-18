import { EL_IDS, GAME_MODE } from './constants.js'

const toPx = (value) => `${value}px`

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

function renderOverlay({ gameMode }) {
    let textElId
    let displayMode = 'block'

    switch (state.gameMode) {
        case GAME_MODE.PAUSED:
            textElId = EL_IDS.overlayTextPause
            break
        case GAME_MODE.GAME_OVER:
            textElId = EL_IDS.overlayTextGameOver
            break
        case GAME_MODE.INIT:
            textElId = EL_IDS.overlayTextStart
            break
        case GAME_MODE.RUNNING:
        default:
            textElId = EL_IDS.overlayTextStart
            displayMode = 'none'
    }

    const overlay = document.getElementById(EL_IDS.overlay)
    const text = document.getElementById(textElId)
    overlay.style.display = displayMode
    text.style.display = displayMode
}

function renderBasket({ basket }) {
    const basketDiv = document.getElementById(EL_IDS.basket)
    basketDiv.style.left = toPx(basket.xPos)
    basketDiv.style.width = toPx(basket.width)
    basketDiv.style.height = toPx(basket.height)
}

function renderBasketValue({ basket }) {}

function renderScore({ score }) {
    const scoreEl = document.getElementById(EL_IDS.scoreValue)
    scoreEl.textContent = score
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
    const fallingObjectColumnEls = document.getElementById(
        EL_IDS.fallingObjectsList,
    ).children

    fallingObjects.forEach((fallingObject) => {
        const fallingObjectColumnEl =
            fallingObjectColumnEls[fallingObject.columnIndex]
        const fallingObjectEl = document.createElement('span')
        const numeratorEl = document.createElement('span')
        const denominatorEl = document.createElement('span')

        fallingObjectEl.classList.add('falling-object')
        fallingObjectEl.id = fallingObject.id
        numeratorEl.classList.add('falling-object-numerator')
        denominatorEl.classList.add('falling-object-denominator')

        fallingObjectEl.style.left = toPx(fallingObject.xPos)
        fallingObjectEl.style.top = toPx(fallingObject.yPos)
        fallingObjectEl.style.width = toPx(fallingObject.width)
        fallingObjectEl.style.height = toPx(fallingObject.height)
        numeratorEl.textContent = fallingObject.numerator
        denominatorEl.textContent = fallingObject.denominator

        fallingObjectEl.appendChild(numeratorEl)
        fallingObjectEl.appendChild(denominatorEl)
        fallingObjectColumnEl.appendChild(fallingObjectEl)
    })
}

function updateFallingObjectPosition(fallingObject) {
    const fallingObjectEl = document.getElementById(fallingObject.id)

    fallingObjectEl.style.top = toPx(fallingObject.yPos)
}
