export const GAME_MODE = {
    INIT: 'init',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'game-over',
}

export const EL_IDS = {
    basket: 'basket',
    scoreValue: 'score-value',
    levelValue: 'level-value',
    targetValue: 'target-value',
    fallingObjectsList: 'falling-objects',
    livesRemaining: 'lives-remaining-value',
    overlayTextStart: 'overlay-text-start',
    overlayTextPause: 'overlay-text-pause',
    overlayTextGameOver: 'overlay-text-gameover',
    overlay: 'game-overlay',
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
