import {
    EL_IDS,
    FALLING_OBJ_INIT_STATE,
    GAME_MODE,
    INIT_STATE,
    LEVEL_VARS,
    LEVEL_MIN_SCORES,
} from './constants.js'
import { playSoundEffect } from './dom.js'
import {
    doesValueMeetTarget,
    pxToPercent,
    randomInRange,
    to2DecimalPlaces,
} from './utils.js'

export const setPlayAreaWidth = (state, width) => {
    return {
        ...state,
        playAreaWidth: width,
    }
}
export const setColumnsXPos = (state, columnsXPos) => {
    return {
        ...state,
        columnsXPos,
    }
}
export const updateBasket = (state, { ...props }) => {
    let xPos = props.xPos
    let basketXPosMax =
        100 - pxToPercent(state.basket.width, state.playAreaWidth) / 2 // xPos is the center of the basket
    if (xPos <= 0) {
        xPos = 0
    } else if (xPos >= basketXPosMax) {
        xPos = basketXPosMax
    }
    return {
        ...state,
        basket: {
            ...state.basket,
            ...props,
            xPos,
        },
    }
}

export const moveBasketLeft = (state) => {
    let xPos =
        state.columnsXPos
            .slice()
            .reverse()
            .find((x) => x < state.basket.xPos) || 0
    if (xPos < 0) {
        xPos = 0
    }

    playSoundEffect(EL_IDS.basketSound, !state.playSounds)

    return {
        ...state,
        basket: {
            ...state.basket,
            xPos,
        },
    }
}

export const moveBasketRight = (state) => {
    let xPos = state.basket.xPos + 100 / 8
    if (xPos > 99) {
        xPos = 99
    }

    playSoundEffect(EL_IDS.basketSound, !state.playSounds)

    return {
        ...state,
        basket: {
            ...state.basket,
            xPos,
        },
    }
}

export const setBasketValue = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            basketValue: value,
        },
    }
}

export const resetBasketValue = (state) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            basketValue: INIT_STATE.basket.basketValue,
        },
    }
}

export const setScore = (state, value) => {
    playSoundEffect(EL_IDS.rocketTakeOffSound, !state.playSounds)
    return {
        ...state,
        score: value,
    }
}

export const resetScore = (state) => {
    return {
        ...state,
        score: INIT_STATE.score,
    }
}

export const resetLevelTarget = (state) => {
    return {
        ...state,
        levelTarget: LEVEL_VARS[0].possibleTargets[0],
    }
}

export const resetLivesRemaining = (state) => {
    return {
        ...state,
        livesRemaining: INIT_STATE.livesRemaining,
    }
}

export const setGameLevel = (state, value) => {
    return {
        ...state,
        gameLevel: value,
    }
}

export const resetGameLevel = (state) => {
    return {
        ...state,
        gameLevel: INIT_STATE.gameLevel,
    }
}

export const setGameMode = (state, value) => {
    return {
        ...state,
        gameMode: value,
    }
}

export const toggleGamePause = (state) => ({
    ...state,
    gameMode:
        state.gameMode === GAME_MODE.PAUSED
            ? GAME_MODE.RUNNING
            : GAME_MODE.PAUSED,
})

export const toggleMute = (state) => ({
    ...state,
    playSounds: !state.playSounds,
})

export const addFallingObject = (state, fallingObj) => {
    playSoundEffect(EL_IDS.spawnFallingObjectSound, !state.playSounds)
    return {
        ...state,
        fallingObjects: {
            ...state.fallingObjects,
            [fallingObj.id]: { ...fallingObj },
        },
    }
}

export const resetFallingObjects = (state) => {
    return {
        ...state,
        fallingObjects: INIT_STATE.fallingObjects,
    }
}

export const removeFallingObject = (state, { id }) => {
    const { [id]: toRemove, ...remainingFallingObjs } = state.fallingObjects

    return {
        ...state,
        fallingObjects: remainingFallingObjs,
    }
}

/**
 * Object constructor for falling object
 *
 * @param columnIndex The index of the falling object column, there are 8 of them, index from 0 to 7
 */
export function FallingObject({
    columnIndex,
    numerator,
    denominator,
    id,
    yPos = FALLING_OBJ_INIT_STATE.yPos,
    xPos = FALLING_OBJ_INIT_STATE.xPos,
    width = FALLING_OBJ_INIT_STATE.width,
    height = FALLING_OBJ_INIT_STATE.height,
}) {
    this.columnIndex = columnIndex
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
    this.numerator = numerator
    this.denominator = denominator
    this.id = id
    this.xPosPx = xPos
    this.value = to2DecimalPlaces(numerator / denominator)
}

export const setFallingObjPosY = (state, { id }, value) => {
    if (!state.fallingObjects[id]) {
        return state
    }

    return {
        ...state,
        fallingObjects: {
            ...state.fallingObjects,
            [id]: {
                ...state.fallingObjects[id],
                yPos: value,
            },
        },
    }
}

// Calculating Functions

export const calcBasketValue = (state, fallingObj) => {
    let value = to2DecimalPlaces(state.basket.basketValue + fallingObj.value)
    return {
        ...state,
        basket: {
            ...state.basket,
            basketValue: value,
        },
    }
}

export const calcScore = (state) => {
    if (!doesValueMeetTarget(state.basket.basketValue, state.levelTarget)) {
        return state
    }

    playSoundEffect(EL_IDS.rocketTakeOffSound, !state.playSounds)
    return {
        ...state,
        score: state.score + 1,
        basket: {
            ...state.basket,
            basketValue: INIT_STATE.basket.basketValue,
        },
    }
}

export const calcLives = (state) => {
    if (state.basket.basketValue <= state.levelTarget) {
        return state
    }

    playSoundEffect(EL_IDS.lifeLostSound, !state.playSounds)
    const livesRemaining = state.livesRemaining - 1
    if (livesRemaining < 1) {
        return {
            ...state,
            livesRemaining,
            fallingObjects: {},
            gameMode: GAME_MODE.GAME_OVER,
        }
    }

    return {
        ...state,
        livesRemaining,
        basket: {
            ...state.basket,
            basketValue: INIT_STATE.basket.basketValue,
        },
    }
}

export const calcLevel = (state) => {
    let nextLevelScore = state.nextLevelScore
    let levelTarget = state.levelTarget
    let level = state.gameLevel

    for (let _level = level; _level < LEVEL_MIN_SCORES.length; _level++) {
        const scoreLowerBound = LEVEL_MIN_SCORES[_level]
        const scoreUpperBound = LEVEL_MIN_SCORES[_level + 1] || Infinity

        if (state.score >= scoreLowerBound && state.score < scoreUpperBound) {
            level = _level
            nextLevelScore = scoreUpperBound
            break
        }
    }

    if (level !== state.gameLevel) {
        const { possibleTargets } = LEVEL_VARS[level]

        levelTarget = possibleTargets[randomInRange(0, possibleTargets.length)]
        playSoundEffect(EL_IDS.levelUpSound, !state.playSounds)
    }

    return {
        ...state,
        levelTarget,
        nextLevelScore: nextLevelScore === Infinity ? '∞' : nextLevelScore,
        gameLevel: level,
    }
}
export const catchFallingObject = (state, fallingObject) => {
    playSoundEffect(EL_IDS.catchFallingObjectSound, !state.playSounds)
    let nextState = calcBasketValue(state, fallingObject)
    nextState = calcScore(nextState)
    nextState = calcLives(nextState)
    nextState = calcLevel(nextState)

    if (
        doesValueMeetTarget(nextState.basket.basketValue, nextState.levelTarget)
    ) {
        nextState = resetBasketValue(nextState)
    }

    return nextState
}

export const restartGame = (state) => {
    let nextState = resetBasketValue(state)
    nextState = resetScore(nextState)
    nextState = resetGameLevel(nextState)
    nextState = resetLevelTarget(nextState)
    nextState = resetLivesRemaining(nextState)
    nextState = setGameMode(nextState, GAME_MODE.RUNNING)
    return resetFallingObjects(nextState)
}

export const startGame = (state) => {
    return {
        ...state,
        levelTarget: LEVEL_VARS[0].possibleTargets[0],
        gameMode: GAME_MODE.RUNNING,
        playSounds: true,
    }
}
