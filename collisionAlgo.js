// let basket = {
//     xPos: 5,
//     yPos: 10,
//     width: 50,
//     height: 20,
// };

// let fallingObj = {
//     xPos: 20,
//     yPos: 100,
//     width: 40,
//     height: 40,
// };

export function isColliding(basket, fallingObj) {
    return !(
        basket.xPos > fallingObj.xPosPx + fallingObj.width ||
        basket.xPos + basket.width < fallingObj.xPosPx ||
        basket.yPos > fallingObj.yPos + fallingObj.height ||
        basket.yPos + basket.height < fallingObj.yPos
    )
}
