import { useState, useEffect } from 'react'

// must declare outside so it doesnt re-render in every call, therefore they remain 'global'
let globalState = {}
let listeners = []
let actions = {}

export const useStore = () => {
    const setState = useState(globalState)[1]

    // Executes actions in the array
    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload)
        globalState = { ...globalState, ...newState }

        // Update the global state in EVERY LISTENER, therefore they will re-render
        for (const listener of listeners) {
            listener(globalState)
        }
    }

    // Adds a listener when the component where this is used is mounted
    useEffect(() => {
        listeners.push(setState)
        // Removes the listener when the component where this is used is UNmounted
        return () => {
            listeners = listeners.filter(li => li !== setState)
        }
    }, [setState])

    // As if we were using the useReducer hook
    return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState }
    }

    actions = { ...actions, ...userActions }
}