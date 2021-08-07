// @ts-check
// suggestion for default speed and rate
import { isColliding } from './collisionAlgo.js'
import {
    EL_IDS,
    FRACTION_PAIRS_BY_DIFFICULTY,
    LEVEL_VARS,
} from './constants.js'
import * as mutatorFns from './stateMutators.js'
import {
    percentToPx,
    randomColumnIndex,
    randomDifficulty,
    randomInRange,
} from './utils.js'

const DEFAULT_SPEED = 200
const DEFAULT_RATE = 120

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

function generateObject(levelVars) {
    const difficulty = randomDifficulty(
        levelVars.fractionDifficultyDistribution,
    )
    let fractionPool = FRACTION_PAIRS_BY_DIFFICULTY[difficulty]

    // Ensure we only consider fractions within the level's bounds
    fractionPool = fractionPool.filter((fractionPair) =>
        levelVars.possibleDenominators.includes(fractionPair[1]),
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

const baseFallingPxPerSec = 250
const baseGenerationSpeedMs = 1500

export function rain(logic) {
    const playArea = document.getElementById(EL_IDS.playArea)
    let savedGenerationSpeedMs = baseGenerationSpeedMs
    let fallingLogics = []
    let timeoutId = null

    function recursiveRain() {
        const levelVars = LEVEL_VARS[logic.state.gameLevel]
        const generationSpeed =
            baseGenerationSpeedMs / levelVars.generationSpeedMultiplier

        if (savedGenerationSpeedMs !== generationSpeed) {
            savedGenerationSpeedMs = generationSpeed
        }

        const obj = generateObject(levelVars)
        logic.mutate(mutatorFns.addFallingObject, obj)

        const fallingObjectEl = document.getElementById(obj.id)
        if (fallingObjectEl) {
            const xPosPx = fallingObjectEl.getBoundingClientRect().x
            obj.xPosPx = xPosPx
        }

        const fallingLogic = fall(
            obj.yPos,
            baseFallingPxPerSec * levelVars.fallingSpeedMultiplier,
            60,
            (newYPos) => {
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
            },
        )

        fallingLogics.push(fallingLogic)
        if (timeoutId !== null) {
            run()
        }
    }

    const run = () => {
        timeoutId = setTimeout(recursiveRain, savedGenerationSpeedMs)
    }

    return {
        pause: () => {
            clearTimeout(timeoutId)
            timeoutId = null
            fallingLogics.forEach((obj) => {
                obj.pause()
            })
        },
        start: () => {
            if (timeoutId === null) {
                run()
                fallingLogics.forEach((obj) => {
                    obj.resume()
                })
            }
        },
        restart: () => {
            clearTimeout(timeoutId)
            fallingLogics.forEach((obj) => {
                obj.stop()
            })
            fallingLogics = []
            savedGenerationSpeedMs = baseGenerationSpeedMs
            run()
        },
        stop: () => {
            clearTimeout(timeoutId)
            fallingLogics.forEach((obj) => {
                obj.stop()
            })
            fallingLogics = []
            savedGenerationSpeedMs = baseGenerationSpeedMs
        },
    }
}
