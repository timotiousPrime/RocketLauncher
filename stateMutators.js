import { INIT_STATE } from './constants.js'

export const setBasketPos = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos: value,
        },
    }
}

export const moveBasketLeft = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos: basket.xPos - value,
        },
    }
}

export const moveBasketRight = (state, value) => {
    return {
        ...state,
        basket: {
            ...state.basket,
            xPos: basket.xPos + value,
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
        fallingObjects: [...state.fallingObjects, fallingObj],
    }
}

export const removeFallingObject = (state, fallingObjId) => {
    const index = state.fallingObjects.findIndex((obj) => obj.id === id)
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

/**
 * Object constructor for falling object
 *
 * @param {number} columnIndex The index of the falling object column, there are 8 of them, index from 0 to 7
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
    return {
        ...state,
        basket: {
            ...state.basket,
            basketValue: basket.basketValue + fallingObj.value,
        },
    }
}

export const calcScore = (state) =>
    basket.basketValue === 1
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
    basket.basketValue > 1
        ? {
              ...state,
              livesRemaining: state.livesRemaining - 1,
              basket: {
                  ...state.basket,
                  basketValue: 0,
              },
          }
        : state

export const update = (state) => {
    let nextState = calcBasketValue(state)
    nextState = calcScore(nextState)
    return calcLives(nextState)
}
