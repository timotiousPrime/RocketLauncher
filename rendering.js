import { EL_IDS, GAME_MODE, IMG } from './constants.js'
import { playBackgroundMusic } from './dom.js'
import { pxToPercent, splitNumber } from './utils.js'

const toPx = (value) => `${value}px`
const toPercent = (value) => `${value}%`
const getLivesRemainingEl = (livesRemaining) =>
    document.getElementById(EL_IDS['livesRemaining' + livesRemaining])
// __This is the main render function which delegates control to the more-specific render functions.__
export function renderGame(prevState, state) {
    function hasStateChanged(stateSelectors) {
        for (const selector of stateSelectors) {
            if (selector(prevState) !== selector(state)) {
                return true
            }
        }
        return false
    }

    renderFallingObjects(state)
    renderNextLevelScore(state)

    // s is the next state in this local scope
    if (hasStateChanged([(s) => s.levelTarget])) {
        renderTargetValue(state)
    }

    if (hasStateChanged([(s) => s.livesRemaining])) {
        renderLivesRemaining(state)
    }

    if (hasStateChanged([(s) => s.basket.basketValue, (s) => s.levelTarget])) {
        renderBasketValue(state)
    }

    if (hasStateChanged([(s) => s.gameMode])) {
        renderOverlay(state)
    }

    if (hasStateChanged([(s) => s.gameMode, (s) => s.playSounds])) {
        renderButtons(state)
    }

    if (hasStateChanged([(s) => s.basket.xPos])) {
        renderBasket(state)
    }

    if (hasStateChanged([(s) => s.score])) {
        renderScore(state)
    }

    if (hasStateChanged([(s) => s.gameLevel])) {
        renderLevel(state)
    }

    if (hasStateChanged([(s) => s.gameMode, (s) => s.playSounds])) {
        renderSounds(state)
    }
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

function renderSounds({ gameMode, playSounds }) {
    playBackgroundMusic(!playSounds, gameMode === GAME_MODE.GAME_OVER)
}

function renderButtons({ gameMode, playSounds }) {
    const restartBtn = document.getElementById(EL_IDS.restartBtn)
    const [restartBtnImg] = restartBtn.children
    const pauseBtn = document.getElementById(EL_IDS.pauseBtn)
    const [pauseBtnImg] = pauseBtn.children
    const muteBtn = document.getElementById(EL_IDS.muteBtn)
    const [muteBtnImg] = muteBtn.children

    if (gameMode === GAME_MODE.INIT) {
        pauseBtn.disabled = true
        restartBtnImg.src = IMG.playBtn
    } else {
        pauseBtn.disabled = false
        restartBtnImg.src = IMG.replayBtn
    }

    if (gameMode === GAME_MODE.PAUSED) {
        pauseBtnImg.src = IMG.playBtn
    } else {
        pauseBtnImg.src = IMG.pauseBtn
    }

    if (playSounds) {
        muteBtnImg.src = IMG.musicOnBtn
    } else {
        muteBtnImg.src = IMG.musicOffBtn
    }
}

function renderFuelContainer(targetValue) {
    const fuelTankNumbers = splitNumber(targetValue)

    const fuelContainerEl = document.getElementById(EL_IDS.fuelContainer)
    fuelContainerEl.classList.add('fuel-container')

    // remove child
    while (fuelContainerEl.firstChild) {
        fuelContainerEl.removeChild(fuelContainerEl.firstChild)
    }

    fuelTankNumbers.forEach((tankValue) => {
        const fuelTankEl = document.createElement('span')
        fuelTankEl.classList.add('fuel-tank')
        const fuelEl = document.createElement('span')
        fuelEl.classList.add('fuel')
        fuelTankEl.appendChild(fuelEl)
        fuelContainerEl.appendChild(fuelTankEl)
        if (tankValue < 1) {
            const fuelLimitLineEl = document.createElement('hr')
            fuelLimitLineEl.classList.add('fuel-limit-line')
            fuelTankEl.appendChild(fuelLimitLineEl)
            fuelLimitLineEl.style.bottom = toPercent(tankValue * 100)
        }
    })
}

function renderTargetValue(state) {
    let value = state.levelTarget
    const levelTargetValue = document.getElementById(EL_IDS.targetValue)
    levelTargetValue.textContent = value
    renderFuelContainer(value)
}

function renderBasket({ basket }) {
    const basketDiv = document.getElementById(EL_IDS.basket)
    const playArea = document.getElementById(EL_IDS.playArea)

    // Basket width in % of play area
    const basketHalfWidthPerc =
        pxToPercent(basket.width, playArea.clientWidth) / 2

    // Gets the left offset the basket in % of play are
    let leftOffSetPercent = basket.xPos - basketHalfWidthPerc // xPos is the center of the basket in percentage

    // Don't allow rendering outside of visible play area
    if (leftOffSetPercent < 0) {
        leftOffSetPercent = 0
    } else if (leftOffSetPercent >= 100 - basketHalfWidthPerc * 2) {
        leftOffSetPercent = 100 - basketHalfWidthPerc * 2
    }

    basketDiv.style.left = toPercent(leftOffSetPercent) // setting the xPos to a percentage
    basketDiv.style.width = toPx(basket.width)
    basketDiv.style.height = toPx(basket.height)
}

function renderBasketValue({ basket, levelTarget }) {
    const basketEl = document.getElementById(EL_IDS.basketValue)

    if (+basketEl.innerText !== +basket.basketValue) {
        basketEl.innerText = basket.basketValue

        const fuelTankNumbers = splitNumber(basket.basketValue)
        const fuelContainerEl = document.getElementById(EL_IDS.fuelContainer)
        Array.from(fuelContainerEl.children).forEach((el, index) => {
            const fuelValueEl = el.firstChild

            fuelValueEl.style.height = toPercent(
                (fuelTankNumbers[index] || 0) * 100,
            )
        })
    }
}

function renderScore({ score }) {
    const scoreEl = document.getElementById(EL_IDS.scoreValue)
    if (+scoreEl.textContent !== +score) {
        scoreEl.textContent = score
    }
}

function renderLevel({ gameLevel }) {
    const levelEl = document.getElementById(EL_IDS.levelValue)
    levelEl.textContent = gameLevel + 1
}
function renderNextLevelScore({ nextLevelScore }) {
    const levelEl = document.getElementById(EL_IDS.nextLevelScore)
    if (levelEl.textContent !== nextLevelScore.toString()) {
        levelEl.textContent = nextLevelScore
    }
}

function renderLivesRemaining({ livesRemaining }) {
    const livesRemainingEl = getLivesRemainingEl(livesRemaining)
    livesRemainingEl.checked = true
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

        const fuelTankEl = document.createElement('span')
        const fuelEl = document.createElement('span')
        fuelTankEl.classList.add('fuel-tank')
        fuelTankEl.appendChild(fuelEl)
        fuelEl.classList.add('fuel')
        fallingObjectEl.classList.add('falling-object')
        fallingObjectEl.id = fallingObject.id
        numeratorEl.classList.add('falling-object-numerator')
        denominatorEl.classList.add('falling-object-denominator')
        numeratorEl.textContent = fallingObject.numerator
        denominatorEl.textContent = fallingObject.denominator
        fuelEl.style.height = toPercent(
            (fallingObject.numerator / fallingObject.denominator) * 100,
        )
        fallingObjectEl.appendChild(numeratorEl)
        fallingObjectEl.appendChild(denominatorEl)
        fallingObjectEl.appendChild(fuelTankEl)
        fallingObjectColumnEl.appendChild(fallingObjectEl)

        fallingObjectEl.style.width = toPx(fallingObject.width)
        fallingObjectEl.style.height = toPx(fallingObject.height)
    })
}
