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

const moveBasketLeftKey = (state, value) => ({
    ...state,
    basketPos: basketPos - value,
});

const moveBasketRightKey = (state, value) => ({
    ...state,
    basketPos: basketPos + value,
});

const moveBasketMouse = (state, value) => ({
    ...state,
    basketPos: value,
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

const setLivesRemaining = (state, value) => ({
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

function addFallingObject (state, fallingObj) {
    state.fallingObjects.push(fallingObj)
};

// need to fix this
function removeFallingObject (state, fallingObj) {
    state.fallingObjects.splice(fallingObj, 1)
};


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

