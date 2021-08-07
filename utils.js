import { PLAY_COLUMNS, TARGET_NOISE_THRESHOLD } from './constants.js'

export const pxToPercent = (px, parentWidth) => (px / parentWidth) * 100

export const percentToPx = (percent, parentWidth) =>
    (percent / 100) * parentWidth

export function to2DecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

export function getClosestColumn(
    percentValue,
    { columnCount, goingLeft = false },
) {
    let percPoints = []
    for (let i = 0; i < columnCount; i++) {
        const index = goingLeft ? i : columnCount - i
        percPoints[index] = (100 / columnCount) * i
    }

    return percPoints.reduce((prev, curr) => {
        const currDiff = Math.abs(curr - percentValue)
        const prevDiff = Math.abs(prev - percentValue)

        return currDiff <= prevDiff ? curr : prev
    })
}

export const doesValueMeetTarget = (value, target) =>
    Math.abs(target - value) <= TARGET_NOISE_THRESHOLD

export function randomColumnIndex() {
    return Math.floor(Math.random() * PLAY_COLUMNS)
}

// generate random number
export function randomInRange(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

export function randomDifficulty(difficultyDistribution) {
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
