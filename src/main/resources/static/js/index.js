const {createStore} = Redux;

//// 상태 정의 ////
let rootState = {
    score: {
        aTeamScore: 0,
        bTeamScore: 0,
    },

    matchResult: {
        result: 'draw' //가능한 상태: a, 'draw', b
    }
}

//// 상태 변경하는 reducer 정의 ////
function rootReducer(state = rootState, action) {
    switch (action.type) {
        case 'score/aTeamIncreased':
            return {
                ...state,
                score: {
                    ...state.score,
                    aTeamScore: state.score.aTeamScore + 1,
                }
            };
        case 'score/bTeamIncreased':
            return {
                ...state,
                score: {
                    ...state.score,
                    bTeamScore: state.score.bTeamScore + 1
                }
            }
        case 'matchResult/result':
            let aTeamScore = state.score.aTeamScore;
            let bTeamScore = state.score.bTeamScore;

            if (aTeamScore > bTeamScore) {
                return {
                    ...state,
                    matchResult: {
                        result: 'a'
                    }
                }
            } else if (aTeamScore < bTeamScore) {
                return {
                    ...state,
                    matchResult: {
                        result: 'b'
                    }
                }
            } else {
                return {
                    ...state,
                    matchResult: {
                        result: 'draw'
                    }
                }
            }
        default:
            return state;
    }
}

let store = createStore(rootReducer);

//// 상태 변경 dispatch. /////

// 상태를 변경시키는 액션 담당 element
let aTeamIncreaseBtn = document.getElementById('aTeamIncreased');
let bTeamIncreaseBtn = document.getElementById('bTeamIncreased');
let resultBtn = document.getElementById('resultBtn');


// dispatch
aTeamIncreaseBtn.addEventListener('click', (e) => {
    store.dispatch({type: 'score/aTeamIncreased'})
})

bTeamIncreaseBtn.addEventListener('click', (e) => {
    store.dispatch({type: 'score/bTeamIncreased'})
})

resultBtn.addEventListener('click', (e) => {
    store.dispatch({type: 'matchResult/result'})
})

// 상태를 표현 담당하는 element
let aTeamScore = document.getElementById('aTeamScore');
let bTeamScore = document.getElementById('bTeamScore');
let matchResult = document.getElementById('matchResult');


function renderAScore() {
    aTeamScore.innerText = store.getState().score.aTeamScore;
}

function renderBScore() {
    bTeamScore.innerText = store.getState().score.bTeamScore;
}

function renderResult() {
    matchResult.innerText = store.getState().matchResult.result;

}

// rendering init
function render() {
    renderAScore();
    renderBScore();
    renderResult();
}

render();

// subscribe rendering
store.subscribe(renderAScore);
store.subscribe(renderBScore);
store.subscribe(renderResult);