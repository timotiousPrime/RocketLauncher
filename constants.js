export const PLAY_COLUMNS = 8

/**
 * How far away from the target still counts to score.
 */
export const TARGET_NOISE_THRESHOLD = 0.05

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
    fuelValue: 'fuel-value',
    fuelContainer: 'fuel-container',
    scoreValue: 'score-value',
    nextLevelScore: 'next-level-score',
    levelValue: 'level-value',
    targetValue: 'target-value',
    fallingObjectsList: 'falling-objects',
    livesRemaining0: 'radio-0',
    livesRemaining1: 'radio-1',
    livesRemaining2: 'radio-2',
    livesRemaining3: 'radio-3',
    overlayTextStart: 'overlay-text-start',
    overlayTextPause: 'overlay-text-pause',
    overlayTextGameOver: 'overlay-text-gameover',
    overlay: 'game-overlay',
    playArea: 'play-area',
    restartBtn: 'restart-btn',
    pauseBtn: 'pause-btn',
    muteBtn: 'mute-btn',
    explosion: 'explode',
    rocket: 'rocket',
    bgMusic: 'background-audio',
    basketSound: 'basket-audio',
    rocketTakeOffSound: 'rocket-launch-audio',
    spawnFallingObjectSound: 'spawn-falling-object-audio',
    catchFallingObjectSound: 'catch-falling-object-audio',
    lifeLostSound: 'life-lost-audio',
    levelUpSound: 'level-up-audio',
    gameOverMusic: 'game-over-audio',
}

export const INIT_STATE = {
    basket: {
        basketValue: 0,
        xPosPx: 0,
        xPos: 0,
        yPos: 0,
        width: 100,
        height: 20,
    },
    playAreaWidth: 0,
    columnsXPos: [],
    score: 0,
    nextLevelScore: 3,
    gameLevel: 0,
    levelTarget: 0,
    livesRemaining: 3,
    fallingObjects: {},
    gameMode: GAME_MODE.INIT,
    playSounds: false,
}

export const FALLING_OBJ_INIT_STATE = {
    columnIndex: 0, // the index of the column that the object is currently in
    xPosPx: 0, // the x position of the object in pixels
    xPos: '50%', // this is relative to the column that the object is in, so it's fixed
    yPos: -5,
    width: 65,
    height: 84,
    numerator: 0,
    denominator: 1,
    value: 0,
}

/**
 * Array index indicates the level with the value being the minimum score needed for that level
 */
export const LEVEL_MIN_SCORES = [0, 3, 8, 13, 18, 23, 28, 33]

const TARGETS_BY_DENOMINATOR = {
    2: [1, 1.5, 2],
    3: [1, 1.33, 1.66, 2],
    4: [1, 1.25, 1.5, 1.75, 2],
    5: [1, 1.2, 1.4, 1.6, 1.8, 2],
    6: [1, 1.16, 1.33, 1.5, 1.66, 1.83],
    8: [1, 1.125, 1.25, 1.375, 1.5],
    9: [1, 1.11, 1.22, 1.33],
}

function getTargetsByDenominators(...denoms) {
    const targets = []
    for (const denom of denoms) {
        targets.push(...TARGETS_BY_DENOMINATOR[denom])
    }
    return Array.from(new Set(targets))
}

export const LEVEL_VARS = [
    // Level 1
    {
        fallingSpeedMultiplier: 1,
        generationSpeedMultiplier: 1,
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
    // Level 2
    {
        fallingSpeedMultiplier: 1.1,
        generationSpeedMultiplier: 1.3,
        possibleTargets: getTargetsByDenominators(3, 4),
        possibleDenominators: [3, 4, 6],
        fractionDifficultyDistribution: {
            1: 80,
            2: 10,
            3: 10,
            4: 0,
            5: 0,
        },
    },
    // Level 3
    {
        fallingSpeedMultiplier: 1.15,
        generationSpeedMultiplier: 1.6,
        possibleTargets: getTargetsByDenominators(4, 5),
        possibleDenominators: [3, 4, 5, 8],
        fractionDifficultyDistribution: {
            1: 75,
            2: 15,
            3: 10,
            4: 0,
            5: 0,
        },
    },
    // Level 4
    {
        fallingSpeedMultiplier: 1.2,
        generationSpeedMultiplier: 2,
        possibleTargets: getTargetsByDenominators(3, 5),
        possibleTargets: [1, 1.33, 1.66, 2, 1.2, 1.4, 1.6, 1.8],
        possibleDenominators: [3, 5, 6, 9],
        fractionDifficultyDistribution: {
            1: 70,
            2: 20,
            3: 10,
            4: 0,
            5: 0,
        },
    },
    // Level 5
    {
        fallingSpeedMultiplier: 1.25,
        generationSpeedMultiplier: 2.3,
        possibleTargets: getTargetsByDenominators(3, 4, 5, 6, 9),
        possibleDenominators: [3, 4, 5, 6, 8, 9],
        fractionDifficultyDistribution: {
            1: 65,
            2: 15,
            3: 10,
            4: 10,
            5: 0,
        },
    },
    // Level 6
    {
        fallingSpeedMultiplier: 1.15,
        generationSpeedMultiplier: 1.2,
        possibleTargets: [
            1.25, 1.33, 1.5, 1.66, 1.75, 2, 2.25, 2.33, 2.5, 2.66, 2.75, 3,
        ],
        possibleDenominators: [3, 4, 5, 6, 7, 8, 9],
        fractionDifficultyDistribution: {
            1: 15,
            2: 20,
            3: 35,
            4: 20,
            5: 10,
        },
    },
    // Level 7
    {
        fallingSpeedMultiplier: 1.2,
        generationSpeedMultiplier: 1.25,
        possibleTargets: [
            1.25, 1.33, 1.5, 1.66, 1.75, 2, 2.25, 2.33, 2.5, 2.66, 2.75, 3,
        ],
        possibleDenominators: [3, 4, 5, 6, 7, 8, 9],
        fractionDifficultyDistribution: {
            1: 0,
            2: 35,
            3: 30,
            4: 20,
            5: 15,
        },
    },
]

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
        [3, 9],
    ],
    3: [
        [2, 3],
        [3, 4],
        [3, 5],
        [4, 5],
        [4, 6],
        [1, 8],
        [6, 8],
        [6, 9],
    ],
    4: [
        [1, 6],
        [5, 6],
        [3, 8],
        [1, 9],
        [2, 9],
    ],
    5: [
        [1, 7],
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7],
        [6, 7],
        [5, 8],
        [7, 8],
        [4, 9],
        [5, 9],
        [7, 9],
        [8, 9],
    ],
}
