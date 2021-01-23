import * as actionTypes from './actions'

const initialState = {
    counterHandler: 0,
    results: []
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
            return {
                ...state,
                counterHandler: state.counterHandler - action.val
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: [...state.results, {id: Math.random(100), value: state.counterHandler}]
            }
        case actionTypes.DELETE_RESULT:
            //const id = 2
            //const newArray = [...state.results]
            //newArray.splice(id, 1)
            const updatedArray = state.results.filter((result) => result.id !== action.strResultId)
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state
    }
}

export default reducer