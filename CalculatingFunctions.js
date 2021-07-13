const calcBasketValue = (basketValue, fallingObjectValue) => {
    basketValue = basketValue + fallingObjectValue
}

const calcScore = (basketValue) => {
    if (basketValue === 1) {
        ++score;
        resetBasketValue;
    }
}

const calcLives = (basketValue) => {
    if (basketValue > 1) {
        --livesRemaining;
        resetBasketValue;
    }
}

// function called when fallingObject touches basket
function update(fallingObjectValue, basketValue) {
    calcBasketValue(basketValue, fallingObjectValue);
    calcScore(basketValue);
    calcLives(basketValue);
}
