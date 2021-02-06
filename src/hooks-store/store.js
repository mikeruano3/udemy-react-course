import { useState, useEffect } from 'react'

// must declare outside so it doesnt re-render in every call, therefore they remain 'global'
let globalState = {}
let listeners = []
let actions = {}

export const useStore = (shouldListen = true) => {
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


    useEffect(() => {
        // Adds a listener when the component where this store is used is mounted
        if (shouldListen) {
            listeners.push(setState)
        }
        // Removes the listener when the component where this is used is UNmounted
        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState)
            }
        }
    }, [setState, shouldListen])

    // As if we were using the useReducer hook
    return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState }
    }

    actions = { ...actions, ...userActions }
}