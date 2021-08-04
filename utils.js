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
