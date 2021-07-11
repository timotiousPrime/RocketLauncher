// __This is the main render function which delegates control to the more-specific render functions.__
function renderGame(state) {
    // This would be the mode the game starts in
    // TODO: It might save us time to start by unifying this game mode state with
    //  the 'game-over' one so that there's one less code path/state to deal with.
    if (state.gameMode === 'menu') {
        renderMenu(state)
        return
    }

    renderMainGame(state)
}

function renderMainScreen(state) {
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
    if (state.gameMode === 'paused') {
        renderPauseOverlay(state)
    } else if (state.gameMode === 'game-over') {
        // Maybe this one just renders a message saying "press enter" to restart,
        //  so we don't have to write buttons
        renderGameOverOverlay(state)
    }
}

// This is just an example of what implementation of the inner-most render functions might look like
function renderBasket({ basketPosition }) {
    const basketDiv = document.getElementById('basket')
    basketDiv.style.left = basketPosition
}
