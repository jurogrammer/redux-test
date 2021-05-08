let initState = {
    counter: {
        value: 0
    }
}

function counterReducer(state = initState, action) {
    switch (action.type) {
        case 'counter/incremented':
            return {value: state.value + 1}
        case 'counter/decremented':
            return {value: state.value - 1}
        default:
            return state
    }
}

function counter2Reducer(state = initState, action) {
    switch (action.type) {
        case 'counter/incremented':
            return {value: state.value + 1}
        case 'counter/decremented':
            return {value: state.value - 1}
        default:
            return state
    }
}

let rootReducer = Redux.combineReducers({counter: counterReducer, counter2: counter2Reducer})