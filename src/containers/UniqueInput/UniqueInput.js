import React, { Component } from 'react';

import classes from './UniqueInput.module.css';

class UniqueInput extends Component {
    state = {
        lastId: null,
        chars: null,
        selectionRange: null,
    }

    constructor(props) {
        super(props);
        if (props.chars && !props.onChange) {
            throw new Error('When specifying chars you must provide onChange function!');
        }
        if ((!props.chars && !props.defaultChars && !props.defaultValue) || (props.defaultChars && props.defaultValue) || (props.chars && props.defaultChars) || (props.chars && props.defaultValue)) {
            throw new Error('You must specify either chars or defaultChars or defaultValue as props!');
        }


        if (props.chars && !props.lastId) {
            throw new Error('If chars specified then you must provide lastId!');
        }


        if (props.defaultValue) {
            this.state.lastId = props.lastId ? props.lastId : -1;
            this.state.chars = props.defaultValue.split('').map(char => ({ id: ++this.state.lastId, value: char }))
        }

        if (props.defaultChars) {
            this.state.chars = props.defaultChars;
            this.state.lastId = props.lastId ? props.lastId : this.state.chars.reduce((lastId, char) => char.id > lastId ? char.id : lastId, -1)
        }
    }

    getNewCharsInfo = (value, selectionRange, selectionRangeBefore) => {
        const wasSelected = selectionRangeBefore.end - selectionRangeBefore.start;
        const lastChars = this.state.chars ? this.state.chars : this.props.chars;
        let lastId = this.state.lastId ? this.state.lastId : this.props.lastId;
        const newStringChars = value.split('');

        if (wasSelected || newStringChars.length > lastChars.length) {
            const deletedCount = selectionRangeBefore.end - selectionRangeBefore.start;
            const addedCount = newStringChars.length + deletedCount - lastChars.length;

            const addedElements = newStringChars.reduce((elems, char, index) => {
                if (index >= selectionRangeBefore.start && index <= selectionRangeBefore.start + addedCount - 1) {
                    elems.push({
                        id: ++lastId,
                        value: char
                    });
                }
                return elems;
            }, []);

            const newChars = [...lastChars];
            newChars.splice(selectionRangeBefore.start, deletedCount, ...addedElements);
            return {
                lastId: lastId,
                chars: newChars,
            }
        }

        const deleteForwarde = selectionRangeBefore.start === selectionRange.start;
        let newChars = [];
        if (deleteForwarde) {
            const deletedCount = lastChars.length - newStringChars.length;
            newChars = lastChars.filter((char, position) => position < selectionRange.start || position > selectionRange.start - 1 + deletedCount);
        } else {
            newChars = lastChars.filter((char, position) => position < selectionRange.start || position > selectionRangeBefore.start - 1);
        }
        return {
            lastId: lastId,
            chars: newChars,
        }
    }

    onSelectHandler = (event) => {
        this.setState({ selectionRange: { start: event.target.selectionStart, end: event.target.selectionEnd } });
        if (this.props.onSelect) {
            this.props.onSelect(event);
        }
    }

    onChangeHandler = (event) => {
        const selectionBefore = { ...this.state.selectionRange };

        const valueAfter = event.target.value;
        const selectionAfter = {
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        };


        const { chars, lastId } = this.getNewCharsInfo(valueAfter, selectionAfter, selectionBefore);

        if (this.state.chars) {
            this.setState({ chars: chars, lastId: lastId })
        }
        if (this.props.onChange) {
            event.chars = chars;
            event.lastId = lastId;
            this.props.onChange(event)
        }
    }

    render() {
        const chars = this.state.chars ? this.state.chars : this.props.chars;
        const value = chars.reduce((value, char) => value + char.value, '');

        const clearedProps = { ...this.props };
        delete clearedProps.lastId;
        delete clearedProps.chars;
        delete clearedProps.defaultChars;
        delete clearedProps.defaultValue;
        return (
            <input
                {...clearedProps}
                value={value}
                className={classes.Input}
                onSelect={this.onSelectHandler}
                onChange={this.onChangeHandler} />
        );
    }
}

export default UniqueInput;