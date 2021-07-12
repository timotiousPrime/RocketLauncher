import { GAME_MODE } from './constants'

// __This is the main render function which delegates control to the more-specific render functions.__
function renderGame(state) {
    // These functions might just get the necessary divs that we set up in the
    //  main HTML file with IDs and set their attributes to state values
    renderFallingObjects(state)
    renderLivesRemaining(state)
    renderBasketValue(state)
    renderBasket(state)
    renderScore(state)
    renderLevel(state)

    // These overlays might be blurred divs that render on top of everything else
    //  so that the user can't interact with the standard game UI underneath
    switch (state.gameMode) {
        case GAME_MODE.PAUSED:
            renderPauseOverlay(state)
            break
        case GAME_MODE.GAME_OVER:
        case GAME_MODE.INIT:
            // Maybe this one just renders a message saying "press enter" to restart,
            //  so we don't have to write buttons
            renderGameOverOverlay(state, {
                isInit: state.gameMode === GAME_MODE.INIT,
            })
            break
        default:
            break
    }
}

// This is just an example of what implementation of the inner-most render functions might look like
function renderBasket({ basketPosition }) {
    const basketDiv = document.getElementById('basket')
    basketDiv.style.left = basketPosition
}
