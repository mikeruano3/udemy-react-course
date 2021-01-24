import * as actionTypes from '../actions'

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                persons: [...state.persons, action.payload.personData]
            }
        case actionTypes.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.payload.personId)
            }
        default:
            return state
    }
}

export default reducer