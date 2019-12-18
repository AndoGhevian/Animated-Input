import * as actionTypes from './actionTypes';

export const moveLeft = () => {
    return {
        type: actionTypes.MOVE_LEFT,
        offset: -1
    }
}

export const moveRight = () => {
    return {
        type: actionTypes.MOVE_RIGHT,
        offset: +1
    }
}

export const move = (way) => {
    switch(way) {
        case 'left':
            return moveLeft();
        case 'right':
            return moveRight();
        default: throw new Error('Unnown way of moving!');
    }
}