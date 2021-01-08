import counterReducer from './counterReducer'
import loginReducer from './loginReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    login: loginReducer
})

export default allReducers