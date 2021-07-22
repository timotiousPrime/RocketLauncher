import { FALLING_OBJ_INIT_STATE, INIT_STATE } from './constants.js'

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
    // console.log(index)
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
    this.value =
        Math.round((numerator / denominator + Number.EPSILON) * 100) / 100
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
            basketValue: state.basket.basketValue + fallingObj.value,
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

export const update = (state, fallingObject) => {
    let nextState = calcBasketValue(state, fallingObject)
    nextState = calcScore(nextState)
    return calcLives(nextState)
}
