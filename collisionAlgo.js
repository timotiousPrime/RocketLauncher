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

function collisionDetection (basket, fallingObj) {
    (basket.xPos > fallingObj.xPos + fallingObj.width ||
    basket.xPos + basket.width < fallingObj.xPos ||
    basket.yPos > fallingObj.yPos + fallingObj.height ||
    basket.yPos + basket.height < fallingObj.yPos) ? 
        console.log('No collision')
     : 
        console.log('Collision Detected')
};