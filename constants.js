export const GAME_MODE = {
    INIT: 'init',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'game-over',
}

export const IMG_PREFIX_DIR = './assets/'
export const IMG = {
    playBtn: IMG_PREFIX_DIR + 'play.png',
    pauseBtn: IMG_PREFIX_DIR + 'pause.png',
    replayBtn: IMG_PREFIX_DIR + 'replay.png',
    musicOnBtn: IMG_PREFIX_DIR + 'music_on.png',
    musicOffBtn: IMG_PREFIX_DIR + 'music_off.png',
}

export const EL_IDS = {
    basket: 'basket',
    basketValue: 'basket-value',
    scoreValue: 'score-value',
    levelValue: 'level-value',
    targetValue: 'target-value',
    fallingObjectsList: 'falling-objects',
    livesRemaining: 'lives-remaining-value',
    overlayTextStart: 'overlay-text-start',
    overlayTextPause: 'overlay-text-pause',
    overlayTextGameOver: 'overlay-text-gameover',
    overlay: 'game-overlay',
    playArea: 'play-area',
    restartBtn: 'restart-btn',
    pauseBtn: 'pause-btn',
    muteBtn: 'mute-btn',
    bgMusic: 'background-audio'
}

export const INIT_STATE = {
    basket: {
        basketValue: 0,
        xPosPx: 0,
        xPos: 50,
        yPos: 0,
        width: 100,
        height: 20,
    },
    score: 0,
    gameLevel: 1,
    livesRemaining: 3,
    fallingObjects: {},
    gameMode: GAME_MODE.INIT,
    muteSounds: false,
}

export const FALLING_OBJ_INIT_STATE = {
    columnIndex: 0, // the index of the column that the object is currently in
    xPosPx: 0, // the x position of the object in pixels
    xPos: '50%', // this is relative to the column that the object is in, so it's fixed
    yPos: 100,
    width: 62,
    height: 34,
    numerator: 0,
    denominator: 1,
    value: 0,
}
