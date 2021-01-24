import * as actionTypes from '../actions/actionTypes'

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter((result) => result.id !== action.strResultId)
    return {
        ...state,
        results: updatedArray
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: [...state.results, {id: Math.random(100), value: action.result}]
            }
        case actionTypes.DELETE_RESULT:
            //const id = 2
            //const newArray = [...state.results]
            //newArray.splice(id, 1)
            return deleteResult(state, action)
        default:
            return state
    }
}

export default reducer