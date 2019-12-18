import React, { Component } from 'react';

import classes from './Input.module.css'

class Input extends Component {
    state = {
        selectionRange: null,
    }

    onSelectHandler = (event) => {
        this.setState({ selectionRange: { start: event.target.selectionStart, end: event.target.selectionEnd } });
        if (this.props.onSelect) {
            this.props.onSelect(event)
        }
    }

    onChangeHandler = (event) => {
        const selectionBefore = { ...this.state.selectionRange };
        const selectionAfter = {
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        };

        const valueAfter = event.target.value;

        this.props.onChange(valueAfter, selectionAfter, selectionBefore);
    }

    render() {
        return (
            <input className={classes.Input} type='text' {...this.props}
                onSelect={this.onSelectHandler}
                onChange={this.onChangeHandler} />
        );
    }
}

export default Input;