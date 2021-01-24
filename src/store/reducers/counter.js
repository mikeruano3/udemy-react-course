import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    counterHandler: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            const newStrate = Object.assign({}, state)
            newStrate.counterHandler = state.counterHandler + 1
            return newStrate
        case actionTypes.DECREMENT:
            return {
                ...state,
                counterHandler: state.counterHandler - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counterHandler: state.counterHandler + action.val
            }
        case actionTypes.SUBTRACT:
            return updateObject(state, { counterHandler: state.counterHandler - action.val })
        default:
            return state
    }
}

export default reducer