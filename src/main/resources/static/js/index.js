import {matchResult, createMatchAction} from './features/referee.js'
import {score, createScoreAction} from './features/counter.js'

const {createStore, combineReducers} = Redux;


let rootReducer = combineReducers({score, matchResult});

let store = createStore(rootReducer);


//// 상태 변경 dispatch. /////

// 상태를 변경시키는 액션 담당 element
let aTeamIncreaseBtn = document.getElementById('aTeamIncreased');
let bTeamIncreaseBtn = document.getElementById('bTeamIncreased');


// dispatch
let AppData = {
    init: function () {
        this.aTeamWin();
        this.bTeamWin();
    },

    aTeamWin: function () {
        aTeamIncreaseBtn.addEventListener('click', (e) => {
            store.dispatch(createScoreAction('a'));
            this.changeReferee();
        })
    },

    bTeamWin: function () {
        bTeamIncreaseBtn.addEventListener('click', (e) => {
            store.dispatch(createScoreAction('b'));
            this.changeReferee();
        })
    },

    changeReferee: function () {
        if (store.getState().score.aTeamScore > store.getState().score.bTeamScore) {
            store.dispatch(createMatchAction('a'));
        } else if (store.getState().score.aTeamScore < store.getState().score.bTeamScore) {
            store.dispatch(createMatchAction('b'));
        } else {
            store.dispatch(createMatchAction('draw'));
        }
    }
}
AppData.init();


// 상태를 표현 담당하는 element
let aTeamScoreTag = document.getElementById('aTeamScore');
let bTeamScoreTag = document.getElementById('bTeamScore');
let matchResultTag = document.getElementById('matchResult');

let AppRender = {
    init: function () {
        this.initRender();

        store.subscribe(() => {
            this.renderAScore();
            this.renderBScore();
            this.renderResult();
        });
    },

    renderAScore: function () {
        aTeamScoreTag.innerText = store.getState().score.aTeamScore;
    },

    renderBScore: function () {
        bTeamScoreTag.innerText = store.getState().score.bTeamScore;

    },

    renderResult: function () {
        matchResultTag.innerText = store.getState().matchResult.result;

    },

    initRender: function () {
        this.renderAScore();
        this.renderBScore();
        this.renderResult();
    }
}
AppRender.init();