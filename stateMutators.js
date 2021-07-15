const gameState = {
    basket: {
        basketValue: 0,
        xPos: 50,
        yPos: 10,
        width: 30,
        height: 10
    },
    score: 0,
    livesRemaining: 3,
    gameLevel: 1,
    gameMode: 'running',
    fallingObjects: [],
}

const setBasketPos = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: value
        }
    }
};

const moveBasketLeft = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: basket.xPos - value,
        },
    }
};

const moveBasketRight = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            xPos: basket.xPos + value,
        },
    }
};

const setBasketValue = (state, value) => {
    return {
        ...state,
        basket: {
            ...basket,
            basketValue: value,
        },
    }
};

const resetBasketValue = (state) => {
    return {
        ...state,
        basket: {
            ...basket,
            basketValue: 0,
        },
    }
};

const setScore = (state, value) => {
    return {
        ...state,
        score: value,
    }
};

const resetScore = (state) => {
    return {
        ...state,
        score: 0,
    }
};

const resetLivesRemaining = (state) => {
    return {
        ...state,
        livesRemaining: 3,
    }
};

const setGameLevel = (state, value) => {
    return {
        ...state,
        gameLevel: value,
    }
};

const resetGameLevel = (state) => {
    return {
        ...state,
        gameLevel: 0,
    }
};

const setGameMode = (state, value) => {
    return {
        ...state,
        gameMode: value,
    }
};

const addFallingObject = (state, fallingObj) => {
    return {
        ...state,
        fallingObjects: [
            ...state.fallingObjects,
            fallingObj,
        ]
    }
};

const removeFallingObject = (state, fallingObjId) => {
    return {
        ...state,
        fallingObjects: [
            ...state.fallingObjects.slice[0, fallingObjId],
            ...state.fallingObjects.slice[fallingObjId + 1],
        ]
    }
};


// Object constructor for falling object
function FallingObject(posX, posY, numerator, denominator) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.numerator = numerator;
    this.denominator = denominator;
    this.value = numerator / denominator;
    this.id = id;
}

const setFallingObjPosY = (fallingObj, value) => {
    return {
        ...fallingObj,
        yPos: value,
    };
};


const setFallingObjNumerator = (fallingObj, value) => {
    return {
        ...fallingObj,
        numerator: value,
    };
};

const setFallingObjDenominator = (fallingObj, value) => {
    return {
        ...fallingObj,
        denominator: value,
    };
};

// Calculating Functions

const calcBasketValue = (state, fallingObj) => {
    return {
        ...state,
        basket: {
            ...basket,
            basketValue: basket.basketValue + fallingObj.value},
    }
};


const calcScore = (state) => (
    basket.basketValue === 1 ? {
        ...state,
        score: state.score + 1,
        basket: {
            ...basket,
            basketValue: 0,
        }
    } : {
        ...state,
    }
)

const calcLives = (state) => (
    basket.basketValue > 1 ? {
        ...state,
        livesRemaining: state.livesRemaining - 1,
        basket: {
            ...basket,
            basketValue: 0,}
    } : {
        ...state,
    }
)

const update = (state, basket, fallingObjectValue) => {
    const newState = calcBasketValue(state, basket, fallingObjectValue);
    const newState2 = calcScore(newState, newState.basket, newState.score);
    const finalState = calcLives(newState2, newState2.basket, newState2.livesRemaining);
    return finalState
}
