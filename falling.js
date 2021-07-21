// @ts-check
// suggestion for default speed and rate
import { isColliding } from './collisionAlgo.js'
import * as mutatorFns from './stateMutators.js'
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
const levelToMaxDenominatorMapper = {
    1: 5,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 50,
    8: 100,
    9: 150,
    10: 200,
}
function generateObject(logic) {
    // TODO: generate number based on logic.state.gameLevel

    logic.state.gameLevel
    let maxDenominator = levelToMaxDenominatorMapper[logic.state.gameLevel]
    let maxNominator = maxDenominator / 2

    const n = [
        randomInRange(1, maxNominator),
        randomInRange(1, maxDenominator),
    ].sort()
    currentId += 1

    return new mutatorFns.FallingObject({
        columnIndex: randomColumnIndex(),
        yPos: 100,
        numerator: n[0],
        denominator: n[1],
        id: currentId,
    })
}

export function rain(logic) {
    let fallingLogics = []
    let interval
    let speed = 700
    const run = () =>
        setInterval(() => {
            const obj = generateObject(logic)

            logic.mutate(mutatorFns.addFallingObject, obj)

            const fallingObjectEl = document.getElementById(obj.id)
            if (fallingObjectEl) {
                const xPosPx = fallingObjectEl.getBoundingClientRect().x
                obj.xPosPx = xPosPx
            }

            speed = logic.state.gameLevel * 20 + 300

            const fallingLogic = fall(obj.yPos, speed, 30, (newYPos) => {
                obj.yPos = newYPos
                logic.mutate(mutatorFns.setFallingObjPosY, obj, newYPos)
                const isCollide = isColliding(logic.state.basket, obj)

                if (isCollide || obj.yPos > window.innerHeight) {
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
                if (isCollide) {
                    logic.mutate(mutatorFns.update, obj)
                }
            })
            fallingLogics.push(fallingLogic)
        }, 2000)

    interval = run()

    return {
        pause: () => {
            clearInterval(interval)
            interval = null
            fallingLogics.forEach((obj) => {
                obj.pause()
            })
        },
        resume: () => {
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
