export const setBasketPos = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: value,
        },
    }
}

export const moveBasketLeft = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: basket.xPos - value,
        },
    }
}

export const moveBasketRight = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: basket.xPos + value,
        },
    }
}

export const setBasketValue = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            basketValue: value,
        },
    }
}

export const resetBasketValue = (state) => {
    return {
        ...state,
        basket: {
            ...basket,
            basketValue: 0,
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
        score: 0,
    }
}

export const resetLivesRemaining = (state) => {
    return {
        ...state,
        livesRemaining: 3,
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
        gameLevel: 0,
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
    return {
        ...state,
        fallingObjects: [
            ...state.fallingObjects.slice(0, fallingObjId),
            ...state.fallingObjects.slice(fallingObjId + 1),
        ],
    }
}

// Object constructor for falling object
export function FallingObject(posX, posY, numerator, denominator) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
    this.numerator = numerator
    this.denominator = denominator
    this.value = numerator / denominator
    this.id = id
}

export const setFallingObjPosY = (fallingObj, value) => {
    return {
        ...fallingObj,
        yPos: value,
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
            ...basket,
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
                  ...basket,
                  basketValue: 0,
              },
          }
        : {
              ...state,
          }

export const calcLives = (state) =>
    basket.basketValue > 1
        ? {
              ...state,
              livesRemaining: state.livesRemaining - 1,
              basket: {
                  ...basket,
                  basketValue: 0,
              },
          }
        : {
              ...state,
          }

export const update = (state, basket, fallingObjectValue) => {
    const newState = calcBasketValue(state, basket, fallingObjectValue)
    const newState2 = calcScore(newState, newState.basket, newState.score)
    const finalState = calcLives(
        newState2,
        newState2.basket,
        newState2.livesRemaining,
    )
    return finalState
}
