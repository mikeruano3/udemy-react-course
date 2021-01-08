import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { createStore } from 'redux'

const increment = (data) => {
    return { type: 'INCREMENT', payload: data }
}

const decrement = () => {
    return { type: 'DECREMENT' }
}

const counterReducer = (state = 0, action ) =>{
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

let store = createStore(counterReducer)

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(increment(5))

ReactDOM.render(<App />, document.getElementById('root'));
