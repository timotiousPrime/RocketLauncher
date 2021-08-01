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
    bgMusic: 'background-audio',
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
    gameLevel: 0,
    livesRemaining: 3,
    fallingObjects: {},
    gameMode: GAME_MODE.INIT,
    playSounds: false,
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

// TODO: add more than 3 levels
export const LEVEL_VARS = [
    {
        fallingSpeed: 1,
        generationFrequency: 1,
        possibleTargets: [1],
        possibleDenominators: [2, 3, 4],
        // Ensure all values add up to 100
        fractionDifficultyDistribution: {
            1: 100,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        },
    },
    {
        fallingSpeed: 1,
        generationFrequency: 1,
        possibleTargets: [1.25, 1.33, 1.5, 1.66, 1.75, 2],
        possibleDenominators: [2, 3, 4, 6],
        fractionDifficultyDistribution: {
            1: 60,
            2: 30,
            3: 10,
            4: 0,
            5: 0,
        },
    },
    {
        fallingSpeed: 1.3,
        generationFrequency: 1.2,
        possibleTargets: [
            1.25, 1.33, 1.5, 1.66, 1.75, 2, 2.25, 2.33, 2.5, 2.66, 2.75, 3,
        ],
        possibleDenominators: [3, 4, 5, 6, 7],
        fractionDifficultyDistribution: {
            1: 30,
            2: 40,
            3: 30,
            4: 0,
            5: 0,
        },
    },
]

// TODO: fill this out properly
// Note the tuple structure is [numerator, denominator]
export const FRACTION_PAIRS_BY_DIFFICULTY = {
    1: [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 4],
        [1, 5],
        [3, 6],
        [2, 8],
        [4, 8],
    ],
    2: [
        [2, 5],
        [2, 6],
        [2, 8],
        [4, 8],
    ],
    3: [
        [2, 3],
        [3, 4],
        [3, 5],
    ],
    4: [
        [1, 6],
        [5, 6],
    ],
    5: [
        [1, 7],
        [2, 7],
    ],
}
