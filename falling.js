// @ts-check
// suggestion for default speed and rate
import { percentToPx } from './utils.js'
import { isColliding } from './collisionAlgo.js'
import * as mutatorFns from './stateMutators.js'
import {
    EL_IDS,
    FALLING_OBJ_INIT_STATE,
    FRACTION_PAIRS_BY_DIFFICULTY,
    LEVEL_VARS,
} from './constants.js'

const DEFAULT_SPEED = 200
const DEFAULT_RATE = 120

// random from 0 to 7
function randomColumnIndex() {
    return Math.floor(Math.random() * 8)
}

// generate random number
function randomInRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

function randomDifficulty(difficultyDistribution) {
    // Creates an array of 100 values, with N for each difficulty where N is the distribution %
    const arrayOfDifficulties = [
        ...new Array(difficultyDistribution[1]).fill(1),
        ...new Array(difficultyDistribution[2]).fill(2),
        ...new Array(difficultyDistribution[3]).fill(3),
        ...new Array(difficultyDistribution[4]).fill(4),
        ...new Array(difficultyDistribution[5]).fill(5),
    ]

    // Picks one of the 100 values to determine the difficulty of this single fraction choice
    return arrayOfDifficulties[randomInRange(0, arrayOfDifficulties.length)]
}

/**
 * update the yPos of the falling objects,
 * onFalling runs when yPos changes
 *
 * @param {number} yPos Vertical position of the object
 * @param {number} speed The falling speed in px/second, how fast does it fall down the screen
 * @param {number} rate The frame rate, frame per second, bigger number for smoother animations
 * @param {(newYPos) => {}} onFalling Revoke with a new yPos pass in as a param
 *
 * @return {{
 *  pause: () => void
 *  resume: () => void
 *  restart: () => void
 *  stop: () => void
 * }}
 */
function fall(yPos, speed, rate, onFalling) {
    let currentYPos = yPos

    const run = () => {
        return setInterval(() => {
            currentYPos = currentYPos + speed / rate
            onFalling(currentYPos)
        }, 1000 / rate)
    }

    let interval = run()

    const actions = {
        stopped: false,
        pause: () => {
            clearInterval(interval)
            interval = null
        },
        resume: () => {
            if (interval === null) {
                // if it's not already running
                interval = run()
            }
        },
        restart: () => {
            clearInterval(interval)
            currentYPos = yPos
            interval = run()
        },
        stop: () => {
            clearInterval(interval)
            currentYPos = null
            interval = null
            actions.pause = () => {}
            actions.resume = () => {}
            actions.restart = () => {}
            actions.stop = () => {}
            actions.stopped = true
        },
    }
    return actions
}

let currentId = 0

function generateObject({ gameLevel }) {
    const { possibleDenominators, fractionDifficultyDistribution } =
        LEVEL_VARS[gameLevel]

    const difficulty = randomDifficulty(fractionDifficultyDistribution)
    let fractionPool = FRACTION_PAIRS_BY_DIFFICULTY[difficulty]

    // Ensure we only consider fractions within the level's bounds
    fractionPool = fractionPool.filter((fractionPair) =>
        possibleDenominators.includes(fractionPair[1]),
    )

    const fractionChoice = fractionPool[randomInRange(0, fractionPool.length)]
    currentId += 1

    return new mutatorFns.FallingObject({
        columnIndex: randomColumnIndex(),
        numerator: fractionChoice[0],
        denominator: fractionChoice[1],
        id: currentId,
    })
}

export function rain(logic) {
    const playArea = document.getElementById(EL_IDS.playArea)
    let fallingLogics = []
    let interval = null
    let speed = 700

    const run = () =>
        setInterval(() => {
            const obj = generateObject(logic.state)
            logic.mutate(mutatorFns.addFallingObject, obj)

            const fallingObjectEl = document.getElementById(obj.id)
            if (fallingObjectEl) {
                const xPosPx = fallingObjectEl.getBoundingClientRect().x
                obj.xPosPx = xPosPx
            }

            speed = logic.state.gameLevel * 20 + 300

            const fallingLogic = fall(obj.yPos, speed, 60, (newYPos) => {
                const basket = {
                    ...logic.state.basket,
                    xPosPx: percentToPx(
                        logic.state.basket.xPos,
                        playArea.clientWidth,
                    ),
                }

                obj.yPos = newYPos
                logic.mutate(mutatorFns.setFallingObjPosY, obj, newYPos)
                const hasCollided = isColliding(basket, obj)

                if (hasCollided || obj.yPos > window.innerHeight) {
                    fallingLogic.stop()
                    logic.mutate(mutatorFns.removeFallingObject, obj)
                    if (fallingObjectEl) {
                        fallingObjectEl.remove()
                    }
                    const index = fallingLogics.indexOf(fallingLogic)
                    if (index !== -1) {
                        fallingLogics = [
                            ...fallingLogics.slice(0, index),
                            ...fallingLogics.slice(index + 1),
                        ]
                    }
                }
                if (hasCollided) {
                    logic.mutate(mutatorFns.catchFallingObject, obj)
                }
            })
            fallingLogics.push(fallingLogic)
        }, 2000)

    return {
        pause: () => {
            clearInterval(interval)
            interval = null
            fallingLogics.forEach((obj) => {
                obj.pause()
            })
        },
        start: () => {
            if (interval === null) {
                // if it's not already running
                interval = run()
                fallingLogics.forEach((obj) => {
                    obj.resume()
                })
            }
        },
        restart: () => {
            clearInterval(interval)
            fallingLogics.forEach((obj) => {
                obj.stop()
            })
            fallingLogics = []
            interval = run()
        },
        stop: () => {
            clearInterval(interval)
            fallingLogics.forEach((obj) => {
                obj.stop()
            })
            fallingLogics = []
        },
    }
}
