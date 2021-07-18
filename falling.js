// suggestion for default speed and rate
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
        },
    }
    return actions
}
