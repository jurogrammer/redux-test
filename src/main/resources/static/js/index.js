const {createStore, combineReducers} = Redux;


// 상태 정의
let scoreState = {
    aTeamScore: 0,
    bTeamScore: 0,
}

let matchResultState = {
    result: '-' //가능한 상태: a, draw, b, -
}

//// 상태 변경하는 reducer 정의 ////
function score(state = scoreState, action) {
    switch (action.type) {
        case 'score/aTeamIncreased':
            return {
                ...state,
                aTeamScore: state.aTeamScore + 1,
            };
        case 'score/bTeamIncreased':
            return {
                ...state,
                bTeamScore: state.bTeamScore + 1
            };
        default:
            return state;
    }
}

function matchResult(state = matchResultState, action) {
    switch (action.type) {
        case 'a':
            return {
                result: 'a'
            }
        case 'b':
            return {
                result: 'b'
            }
        case 'draw':
            return {
                result: 'draw'
            }
        default:
            return state;
    }
}

let rootReducer = combineReducers({score, matchResult});


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


// 상태 A로 바꿔주세요, B로 바꿔주세요. 얘가 판단하는게 맞니?
resultBtn.addEventListener('click', (e) => {
    let score = store.getState().score;
    if (score.aTeamScore > score.bTeamScore) {
        store.dispatch({type: 'a'})
    } else if (score.aTeamScore < score.bTeamScore) {
        store.dispatch({type: 'b'})
    } else
        store.dispatch({type: 'draw'})
})

// 상태를 표현 담당하는 element
let aTeamScoreTag = document.getElementById('aTeamScore');
let bTeamScoreTag = document.getElementById('bTeamScore');
let matchResultTag = document.getElementById('matchResult');


function renderAScore() {
    aTeamScoreTag.innerText = store.getState().score.aTeamScore;
}

function renderBScore() {
    bTeamScoreTag.innerText = store.getState().score.bTeamScore;
}

function renderResult() {
    matchResultTag.innerText = store.getState().matchResult.result;
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