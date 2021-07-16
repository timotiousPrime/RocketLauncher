// Why does this bring an error?
// import { GAME_MODE } from "./constants";


// move basket when left or right key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        console.log('Left key was pressed')
        // moveBasketLeft(state, 10)
    }; 
    
    if (e.key === 'ArrowRight') {
        console.log('Right key was pressed')
        // moveBasketRight(state, 10)
    };
})

// move basket when mouse is used
const playArea = document.querySelector('.play-area');

playArea.addEventListener('mousemove', (e) => {
    let basketCenter = e.clientX - ( basket.width / 2 )
    let xPos = basketCenter + 'px';
    basketDiv.style.left = xPos;
    // setBasketPos(state, xPos) mutator


})

// listen when p/enter/space/esc is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || 
        e.key === ' ' || 
        e.key === 'Escape' || 
        e.key === 'Pause') {
            // setGameMode(state, 'pause')
    }
})

// Listen for when enter is pressed when game is paused, to resume game
document.addEventListener('keydown', (e) => {
    if (GAME_MODE === 'paused' && e.key === 'Enter') {
        setGameMode(state, 'running')
    }
})


// listen for when play is clicked
// will add when buttons for this functionality are added


// listen for when pause is clicked
// will add when buttons for this functionality are added