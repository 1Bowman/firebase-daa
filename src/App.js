import React, { Component } from 'react';
import { Modal, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.isOpen,
      formContents: {
        name: '',
        age: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      showModal: this.props.isOpen
    })
    console.log('APP RECIEVED PROPS', this.props.isOpen)
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  handleNameChange = (e) => {
    this.setState({
      formContents: {
        name: e.target.value,
        age: this.state.formContents.age
      }
    })
  }

  handleAgeChange = (e) => {
    this.setState({
      formContents: {
        name: this.state.formContents.name,
        age: e.target.value
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('inside handleSubmit')

    const rootRef = firebase.database().ref();
    const personRef = rootRef.child("person");

    personRef.push(this.state.formContents, () => {
      console.log('updated firebase')
    }).then(() => this.closeModal());


  }

  render() {
    return (
      <div className="App">
        <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form horizontal>
                <FormGroup controlId="formHorizontalName">
                  <Col xsOffset={1} xs={2}>Name</Col>
                  <Col xs={8}>
                    <FormControl name="name" onChange={this.handleNameChange} type="text" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalAge">
                  <Col xsOffset={1} xs={2}>Age</Col>
                  <Col xs={8}>
                    <FormControl name="age" onChange={this.handleAgeChange} type="text" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col xsOffset={2} xs={10}>
                    <Button bsStyle="primary" type="button" onClick={this.handleSubmit}>Submit</Button>
                  </Col>
                </FormGroup>

              </Form>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;
