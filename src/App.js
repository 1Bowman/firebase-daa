import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'alexx'
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const nameRef = rootRef.child("name");
    nameRef.on('value', (snap) => {
      this.setState({
        name: snap.val()
      })
    });
  }

  handleChange(event) {
    const rootRef = firebase.database().ref();
    const nameRef = rootRef.child("name");
    const inputVal = event.target.value

    nameRef.set(inputVal, () => {
      this.setState({
        name: inputVal
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
        <input value={this.state.name} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
