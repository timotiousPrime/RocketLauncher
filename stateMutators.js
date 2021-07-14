const gameState = {
    basketPos: 50,
    basketValue: 0,
    score: 0,
    livesRemaining: 3,
    gameLevel: 1,
    gameMode: 'running',
    fallingObjects: [],
}

const setBasketPos = (state, value) => ({
    ...state,
    basketPos: value,
});

const moveBasketLeft = (state, value) => ({
    ...state,
    basketPos: basketPos - value,
});

const moveBasketRight = (state, value) => ({
    ...state,
    basketPos: basketPos + value,
});

const setBasketValue = (state, value) => ({
    ...state,
    basketValue: value,
});

const resetBasketValue = (state) => ({
    ...state,
    basketValue: 0,
});

const setScore = (state, value) => ({
    ...state,
    score: value,
});

const resetScore = (state) => ({
    ...state,
    score: 0,
});

const loseLife = (state, value) => ({
    ...state,
    livesRemaining: value,
});

const resetLivesRemaining = (state) => ({
    ...state,
    livesRemaining: 3,
});

const setGameLevel = (state, value) => ({
    ...state,
    gameLevel: value,
});

const resetGameLevel = (state) => ({
    ...state,
    gameLevel: 0,
});

const setGameMode = (state, value) => ({
    ...state,
    gameMode: value,
});

const addFallingObject = (state, fallingObj) => ({
    ...state,
    fallingObjects: [
        ...state.fallingObjects,
        fallingObj,
    ]
});

const removeFallingObject = (state, fallingObjId) => ({
    ...state,
    fallingObjects: [
        ...state.fallingObjects.slice[0, fallingObjId],
        ...state.fallingObjects.slice[fallingObjId + 1],
    ]
});


// Object constructor for falling object
function FallingObject(posX, posY, numerator, denominator) {
    this.posX = posX;
    this.posY = posY;
    this.numerator = numerator;
    this.denominator = denominator;
    this.value = numerator / denominator;
    this.id = id;
}

const setFallingObjPosY = (fallingObj, value) => {
    fallingObj.posY = value;
}


const setFallingObjNumerator = (fallingObj, value) => {
    fallingObj.numerator = value;
}

const setFallingObjDenominator = (fallingObj, value) => {
    fallingObj.denominator = value;
}

