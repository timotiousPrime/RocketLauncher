import { EL_IDS } from './constants.js'
import * as mutatorFns from './stateMutators.js'

export function setupInitialDOMRelatedState(logic) {
    const basketEl = document.getElementById(EL_IDS.basket)

    const { x, y, width, height } = basketEl.getBoundingClientRect()
    logic.mutate(mutatorFns.updateBasket, { xPos: x, yPos: y, width, height })
}
