// @ts-check

import { FALLING_OBJ_INIT_STATE, INIT_STATE } from './constants.js'

function to2DecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export const updateBasket = (state, { ...props }) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            ...props,
        },
    }
}

export const moveBasketLeft = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos: state.basket.xPos - value,
        },
    }
}

export const moveBasketRight = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos: state.basket.xPos + value,
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

export const addFallingObject = (state, fallingObj) => {
    return {
        ...state,
        fallingObjects: [...state.fallingObjects, { ...fallingObj }],
    }
}

export const removeFallingObject = (state, fallingObj) => {
    const index = state.fallingObjects.findIndex(
        (obj) => obj.id === fallingObj.id,
    )
    if (index === -1) {
        return state // A non-existent ID was passed in, hence do nothing
    }

    return {
        ...state,
        fallingObjects: [
            ...state.fallingObjects.slice(0, index),
            ...state.fallingObjects.slice(index + 1),
        ],
    }
}

export const resetFallingObjects = (state) => {
    return {
        ...state,
        fallingObjects: [],
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

export const setFallingObjPosY = (state, fallingObj, value) => {
    const newFallingObjects = state.fallingObjects.map((obj) => {
        if (obj.id === fallingObj.id) {
            return {
                ...obj,
                yPos: value,
            }
        } else {
            return {
                ...obj,
            }
        }
    })

    return {
        ...state,
        fallingObjects: newFallingObjects,
    }
}

export const setFallingObjNumerator = (fallingObj, value) => {
    return {
        ...fallingObj,
        numerator: value,
    }
}

export const setFallingObjDenominator = (fallingObj, value) => {
    return {
        ...fallingObj,
        denominator: value,
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

export const calcLives = (state) =>
    state.basket.basketValue > 1
        ? {
              ...state,
              livesRemaining: state.livesRemaining - 1,
              basket: {
                  ...state.basket,
                  basketValue: 0,
              },
          }
        : state

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
export const update = (state, fallingObject) => {
    let nextState = calcBasketValue(state, fallingObject)
    nextState = calcScore(nextState)
    console.log(nextState)
    nextState = calcLives(nextState)
    nextState = calcLevel(nextState)

    if ([0.99, 1].includes(nextState.basket.basketValue)) {
        nextState = setBasketValue(nextState, 0)
    }

    return nextState
}
