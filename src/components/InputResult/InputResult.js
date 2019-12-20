import React from 'react';
import { Transition, config } from 'react-spring/renderprops';

import classes from './InputResult.module.css';

const InputResult = (props) => {
    return (
        <div className={classes.InputResult}>
            <Transition items={props.characters} keys={character => character.id}
                from={{ /* transform: 'translateY(-100px)', */ opacity: 0 }}
                enter={{ /* transform: 'translateY(0)', */ opacity: 1 }}
                leave={{/*  transform: 'translateY(-100px)', */ opacity: 0 }} >
                {(character, state) => props => {
                    return (
                        <p style={props}>{character.value}</p>
                    )
                }}
            </Transition>
        </div>
    );
}

export default InputResult;
