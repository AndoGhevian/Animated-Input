import * as actionTypes from './actionTypes';

const initialState = {
    index: 0
}

const moveLeft = (state, action) => {
    return {
        ...state,
        index: state.index + action.offset
    }
}

const moveRight = (state, action) => {
    return {
        ...state,
        index: state.index + action.offset
    }
}

const reducer = (state, action) {
    switch(action.type) {
        case actionTypes.MOVE_LEFT:
            return moveLeft(state, action);
        case actionTypes.MOVE_RIGHt:
            return moveRight(state, action);
        default: return state;
    }
}

export default reducer;