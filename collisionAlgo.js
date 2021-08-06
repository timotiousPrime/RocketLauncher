export function isColliding(basket, fallingObj) {
    return !(
        basket.xPosPx > fallingObj.xPosPx + basket.width ||
        basket.xPosPx + fallingObj.width < fallingObj.xPosPx ||
        basket.yPos > fallingObj.yPos + fallingObj.height ||
        basket.yPos + basket.height < fallingObj.yPos
    )
}
