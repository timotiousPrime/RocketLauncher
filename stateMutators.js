import { FALLING_OBJ_INIT_STATE, GAME_MODE, INIT_STATE } from './constants.js'
import { pxToPercent, to2DecimalPlaces } from './utils.js'

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
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos,
        },
    }
}

export const moveBasketRight = (state) => {
    let xPos =
        state.columnsXPos.find((x) => x > state.basket.xPos) ||
        state.columnsXPos[state.columnsXPos.length - 1]
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
    yPos,
    numerator,
    denominator,
    id,
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

export const calcScore = (state) =>
    state.basket.basketValue === 1 || state.basket.basketValue === 0.99
        ? {
              ...state,
              score: state.score + 1,
              basket: {
                  ...state.basket,
                  basketValue: INIT_STATE.basket.basketValue,
              },
          }
        : state

export const calcLives = (state) => {
    if (state.basket.basketValue <= 1) {
        return state
    }

    const livesRemaining = state.livesRemaining - 1
    if (livesRemaining < 1) {
        return {
            ...state,
            gameMode: GAME_MODE.GAME_OVER,
            fallingObjects: {},
        }
    }

    return {
        ...state,
        livesRemaining,
        basket: {
            ...state.basket,
            basketValue: 0,
        },
    }
}

export const calcLevel = (state) => {
    let level = state.gameLevel
    let nextLevelScore = 10
    const score = state.score
    if (score >= 10 && score < 20) {
        level = 2
        nextLevelScore = 20
    }
    if (score >= 20 && score < 35) {
        level = 3
        nextLevelScore = 35
    }
    if (score >= 35 && score < 55) {
        level = 4
        nextLevelScore = 55
    }
    if (score >= 55 && score < 80) {
        level = 5
        nextLevelScore = 80
    }
    if (score >= 70 && score < 100) {
        level = 6
        nextLevelScore = 100
    }
    if (score >= 100 && score < 135) {
        level = 7
        nextLevelScore = 135
    }
    if (score >= 135 && score < 175) {
        level = 8
        nextLevelScore = 175
    }
    if (score >= 175 && score < 220) {
        level = 9
        nextLevelScore = 220
    }
    if (score >= 220) {
        level = 10
        nextLevelScore = '∞'
    }

    return {
        ...state,
        gameLevel: level,
        nextLevelScore,
    }
}
export const catchFallingObject = (state, fallingObject) => {
    let nextState = calcBasketValue(state, fallingObject)
    nextState = calcScore(nextState)
    console.log(nextState)
    nextState = calcLives(nextState)
    nextState = calcLevel(nextState)

    if ([0.99, 1].includes(nextState.basket.basketValue)) {
        nextState = resetBasketValue(nextState)
    }

    return nextState
}

export const restartGame = (state) => {
    let nextState = resetBasketValue(state)
    nextState = resetScore(nextState)
    nextState = resetGameLevel(nextState)
    nextState = resetLivesRemaining(nextState)
    nextState = setGameMode(nextState, GAME_MODE.RUNNING)
    return resetFallingObjects(nextState)
}

export const startGame = (state) => {
    return {
        ...state,
        gameMode: GAME_MODE.RUNNING,
        playSounds: true,
    }
}
