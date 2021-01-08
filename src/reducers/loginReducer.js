const initialState = {
    isLoggedIn: false,
    user: undefined
}

const loginReducer = ( state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: { name: 'Miguel' },
                isLoggedIn: !state.isLoggedIn
            }
        default:
            return state
    }
}

export default loginReducer