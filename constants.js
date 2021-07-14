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
}

export const INIT_STATE = {
    score: 0,
    gameLevel: 1,
    basketPos: 50,
    basketValue: 0,
    livesRemaining: 3,
    fallingObjects: [],
    gameMode: 'running',
}
