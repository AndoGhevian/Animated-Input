import React, { Component } from 'react';

// import resizable from '../hoc/resizable';

// import MySpring from '../components/MySpring/MySpring';
import Input from '../components/Input/Input';
import InputResult from '../components/InputResult/InputResult';
import './App.css';

class App extends Component {
  state = {
    input: {
      lastId: -1,
      chars: [],
      value: '',
    },
  }
  inputChangeHandler = (value, selectionRange, selectionRangeBefore) => {
    this.setState(prevState => {
      const isSelected = selectionRangeBefore.end - selectionRangeBefore.start;
      const chars = value.split('');

      if (isSelected || chars.length > prevState.input.chars.length) {
        const deletedCount = selectionRangeBefore.end - selectionRangeBefore.start;
        const addedCount = chars.length + deletedCount - prevState.input.chars.length;

        let lastId = prevState.input.lastId;
        const addedElements = chars.reduce((elems, char, index) => {
          if (index >= selectionRangeBefore.start && index <= selectionRangeBefore.start + addedCount - 1) {
            elems.push({
              id: ++lastId,
              value: char
            });
          }
          return elems;
        }, []);

        const newChars = [...prevState.input.chars];
        newChars.splice(selectionRangeBefore.start, deletedCount, ...addedElements);
        return ({
          input: {
            lastId: lastId,
            chars: newChars,
            value: value
          }
        });
      }

      const deleteForwarde = selectionRangeBefore.start === selectionRange.start;
      let newChars = [];
      if (deleteForwarde) {
        const deletedCount = prevState.input.chars.length - chars.length;
        newChars = prevState.input.chars.filter((char, position) => position < selectionRange.start || position > selectionRange.start + deletedCount - 1);
      } else {
        newChars = prevState.input.chars.filter((char, position) => position < selectionRange.start || position > selectionRangeBefore.start - 1);
      }
      return ({
        input: {
          lastId: prevState.input.lastId,
          chars: newChars,
          value: value
        }
      })
    })
  }



  render() {
    return (
      <div className="App">
        <Input name='what' value={this.state.input.value} onChange={this.inputChangeHandler} />
        <InputResult characters={this.state.input.chars} />
      </div>
    );
  }
}

export default App;