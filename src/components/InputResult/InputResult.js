import React from 'react';
import { Transition, config } from 'react-spring/renderprops';

import classes from './InputResult.module.css';

const InputResult = (props) => {
    return (
        <div className={classes.InputResult}>
            <Transition items={props.characters} keys={character => character.id}
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                config={(key, state) => {
                    if (state === 'leave') {
                        return { precision: 1 }
                    }
                }} >
                {(character, state) => props => {
                    console.log(props)
                    return (
                        <span style={props}>{character.value}</span>
                    )
                }}
            </Transition>
        </div>
    );
}

export default InputResult;
