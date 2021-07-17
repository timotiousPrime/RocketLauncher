export const GAME_MODE = {
    INIT: 'init',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'game-over',
}

export const EL_IDS = {
    basket: 'basket',
    basketValue: 'basket-value',
    scoreValue: 'score-value',
    levelValue: 'level-value',
    targetValue: 'target-value',
    livesRemaining: 'lives-remaining-value',
    overlayTextStart: 'overlay-text-start',
    overlayTextPause: 'overlay-text-pause',
    overlayTextGameOver: 'overlay-text-gameover',
    overlay: 'game-overlay',
    fallingObjectColumn: '.js-falling-object-column',
}

export const INIT_STATE = {
    basket: {
        basketValue: 0,
        xPos: 50,
        yPos: 0,
        width: 30,
        height: 10,
    },
    score: 0,
    gameLevel: 1,
    livesRemaining: 3,
    fallingObjects: [],
    gameMode: 'running',
}

export const FALLING_OBJ_INIT_STATE = {
    columnIndex: 0, // the index of the column that the object is currently in
    xPos: '50%', // this is relative to the column that the object is in, so it's fixed
    yPos: 100,
    width: 62,
    height: 34,
    numerator: 0,
    denominator: 1,
}
