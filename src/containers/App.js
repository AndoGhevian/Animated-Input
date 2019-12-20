import React, { Component } from 'react';

import InputResult from '../components/InputResult/InputResult';
import UniqueInput from './UniqueInput/UniqueInput';
import './App.css';

class App extends Component {
  state = {
    input: {
      lastId: -1,
      value: 'Andy Valiant',
      characters: []
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      input: {
        characters: event.chars,
        value: event.value,
        lastId: event.lastId
      }
    });
  }

  render() {
    return (
      <div className="App">
        {/* <UniqueInput chars={this.state.input.characters} lastId={this.state.input.lastId} onChange={this.onChangeHandler} /> */}
        {/* <UniqueInput defaultChars={this.state.input.characters} lastId={this.state.input.lastId} onChange={this.onChangeHandler} /> */}
        <UniqueInput defaultValue={'Hello'} lastId={this.state.input.lastId} onChange={this.onChangeHandler} />
        <InputResult characters={this.state.input.characters} />
      </div>
    );
  }
}

export default App;