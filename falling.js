// suggestion for default speed and rate
const DEFAULT_SPEED = 200;
const DEFAULT_RATE = 120;

/**
 * update the posY of the falling objects,
 * onFalling runs when posY changes
 *
 * @param {number} posY Vertical position of the object
 * @param {number} speed The falling speed in px/second, how fast does it fall down the screen
 * @param {number} rate The frame rate, frame per second, bigger number for smoother animations
 * @param {(newPosY) => {}} onFalling Revoke with a new posY pass in as a param
 *
 * @return {() => void} clearInterval function
 */
function fall(posY, speed, rate, onFalling) {
  const interval = setInterval(() => {
    const newPosY = posY + speed / rate;
    onFalling(newPosY);
  }, 1000 / rate);

  return () => {
    clearInterval(interval);
  };
}
