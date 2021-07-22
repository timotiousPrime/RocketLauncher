export function isColliding(basket, fallingObj) {
    return !(
        basket.xPosPx > fallingObj.xPosPx + fallingObj.width ||
        basket.xPosPx + basket.width < fallingObj.xPosPx ||
        basket.yPos > fallingObj.yPos + fallingObj.height ||
        basket.yPos + basket.height < fallingObj.yPos
    )
}
