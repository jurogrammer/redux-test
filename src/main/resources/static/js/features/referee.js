const matchResultState = {
    result: '-' //가능한 상태: a, draw, b, -
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

function createMatchAction(type) {
    switch (type) {
        case 'a':
            return {type: 'a'};
        case 'b':
            return {type: 'b'};
        case 'draw':
            return {type: 'draw'};
    }

}