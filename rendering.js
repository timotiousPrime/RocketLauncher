import { GAME_MODE, EL_IDS } from './constants'

// __This is the main render function which delegates control to the more-specific render functions.__
function renderGame(state) {
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
    basketDiv.style.left = basket.xPos
    basketDiv.style.width = basket.width
    basketDiv.style.height = basket.height
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
    const fallingObjectsContainer = document.getElementById(
        EL_IDS.fallingObjectsList,
    )

    fallingObjects.forEach((fallingObject) => {
        const fallingObjectEl = document.createElement('li')
        const numeratorEl = document.createElement('div')
        const denominatorEl = document.createElement('div')

        fallingObjectEl.classList.add('falling-object')
        numeratorEl.classList.add('falling-object-numerator')
        denominatorEl.classList.add('falling-object-denominator')

        fallingObjectEl.style.left = fallingObject.xPos
        fallingObjectEl.style.top = fallingObject.yPos
        fallingObjectEl.style.width = fallingObject.width
        fallingObjectEl.style.height = fallingObject.height
        numeratorEl.textContent = fallingObject.numerator
        denominatorElEl.textContent = fallingObject.denominator

        fallingObjectEl.appendChild(numeratorEl)
        fallingObjectEl.appendChild(denominatorEl)
        fallingObjectsContainer.appendChild(fallingObjectEl)
    })
}
