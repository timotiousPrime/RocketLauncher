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

const setBasketValue = (state, value) => ({
    ...state,
    basketValue: value,
});

const setScore = (state, value) => ({
    ...state,
    score: value,
});

const setlivesRemaining = (state, value) => ({
    ...state,
    livesRemaining: value,
});

const setGameLevel = (state, value) => ({
    ...state,
    gameLevel: value,
});

const setGameMode = (state, value) => ({
    ...state,
    gameMode: value,
});

// Object constructor for falling object
function FallingObject(posX, posY, numerator, denominator) {
    this.posX = posX;
    this.posY = posY;
    this.numerator = numerator;
    this.denominator = denominator;
    this.value = numerator / denominator
}

const setFallingObjPosX = (fallingObj, value) => {
    fallingObj.posX = value;
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

