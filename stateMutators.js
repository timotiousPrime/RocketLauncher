import { FALLING_OBJ_INIT_STATE, GAME_MODE, INIT_STATE } from './constants.js'

function to2DecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export const updateBasket = (state, { ...props }) => {
    let xPos = props.xPos
    if (xPos <= 0) {
        xPos = 0
    } else if (xPos >= 99) {
        xPos = 99
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
    let xPos = state.basket.xPos - 100 / 8
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
    let xPos = state.basket.xPos + 100 / 8
    if (xPos > 99) {
        xPos = 99
    }

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
    const score = state.score

    if (score >= 10 && score < 20) {
        level = 2
    }
    if (score >= 20 && score < 35) {
        level = 3
    }
    if (score >= 35 && score < 55) {
        level = 4
    }
    if (score >= 55 && score < 80) {
        level = 5
    }
    if (score >= 70 && score < 100) {
        level = 6
    }
    if (score >= 100 && score < 135) {
        level = 7
    }
    if (score >= 135 && score < 175) {
        level = 8
    }
    if (score >= 175 && score < 220) {
        level = 9
    }
    if (score >= 220) {
        level = 10
    }

    return {
        ...state,
        gameLevel: level,
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