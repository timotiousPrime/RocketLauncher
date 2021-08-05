import { EL_IDS, GAME_MODE, IMG } from './constants.js'
import { playBackgroundMusic } from './dom.js'
import { pxToPercent } from './utils.js'

const toPx = (value) => `${value}px`
const toPercent = (value) => `${value}%`
const getLivesRemainingEl = (livesRemaining) =>
    document.getElementById(EL_IDS['livesRemaining' + livesRemaining])
// __This is the main render function which delegates control to the more-specific render functions.__
export function renderGame(state) {
    renderFallingObjects(state)
    renderLivesRemaining(state)
    renderBasketValue(state)
    renderOverlay(state)
    renderButtons(state)
    renderBasket(state)
    renderScore(state)
    renderLevel(state)
    renderNextLevelScore(state)
    renderSounds(state)
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
    const fuelValueEl = document.getElementById(EL_IDS.fuelValue)
    if (+basketEl.innerText !== +basket.basketValue) {
        basketEl.innerText = basket.basketValue
        fuelValueEl.style.height = toPercent(
            (basket.basketValue / levelTarget) * 100,
        )
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
    levelEl.textContent = gameLevel
}
function renderNextLevelScore({ nextLevelScore }) {
    const levelEl = document.getElementById(EL_IDS.nextLevelScore)
    if (levelEl.textContent + '' !== nextLevelScore + '') {
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
        const fuelWrapperEl = document.createElement('span')
        const fuelEl = document.createElement('span')
        fuelWrapperEl.classList.add('fuel-wrapper')
        fuelWrapperEl.appendChild(fuelEl)
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
        fallingObjectEl.appendChild(fuelWrapperEl)
        fallingObjectColumnEl.appendChild(fallingObjectEl)

        fallingObjectEl.style.width = toPx(fallingObject.width)
        fallingObjectEl.style.height = toPx(fallingObject.height)
    })
}
