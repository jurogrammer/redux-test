const scoreState = {
    aTeamScore: 0,
    bTeamScore: 0,
}

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

function createScoreAction(type) {
    switch (type) {
        case 'a':
            return {type: 'score/aTeamIncreased'}
        case 'b':
            return {type: 'score/bTeamIncreased'}
    }
}