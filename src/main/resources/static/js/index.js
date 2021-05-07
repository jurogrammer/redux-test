const {createStore} = Redux;

function counterReducer(state = {value: 0}, action) {
    switch (action.type) {
        case 'counter/incremented':
            return {value: state.value + 1}
        case 'counter/decremented':
            return {value: state.value - 1}
        default:
            return state
    }
}

let store = createStore(counterReducer);

// 상태 변경 dispatch
document.getElementById("increaseScore").addEventListener("click", e => {
    store.dispatch({type: 'counter/incremented'})
})

document.getElementById("decreaseScore").addEventListener("click", e => {
    store.dispatch({type: 'counter/decremented'})
})

// rendering
store.subscribe(() => {
    document.getElementById('score').innerText = store.getState().value;
})