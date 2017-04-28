import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue : {
        name: 'Alex',
        age: '21'
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const personRef = rootRef.child("person");
    personRef.on('value', (snap) => {
      this.setState({
        formValue: snap.val()
      })
    });
  }

  handleNameChange = (e) => {
    this.setState({
      formValue: {
        name: e.target.value,
        age: this.state.formValue.age
      }
    })
  }

  handleAgeChange = (e) => {
    this.setState({
      formValue: {
        name: this.state.formValue.name,
        age: e.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const rootRef = firebase.database().ref();
    const personRef = rootRef.child("person");

    personRef.set(this.state.formValue, () => {
      console.log('updated firebase')
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <h1>{this.state.formValue.name} - {this.state.formValue.age}</h1>
        </div>
        <div className="row">
          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col xsOffset={1} xs={2}>Name</Col>
              <Col xs={8}>
                <FormControl onChange={this.handleNameChange} type="text" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAge">
              <Col xsOffset={1} xs={2}>Age</Col>
              <Col xs={8}>
                <FormControl onChange={this.handleAgeChange} type="text" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xsOffset={2} xs={10}>
                <Button bsStyle="primary" type="button" onClick={this.handleSubmit}>Submit</Button>
              </Col>
            </FormGroup>

          </Form>

        </div>
      </div>
    );
  }
}

export default App;
