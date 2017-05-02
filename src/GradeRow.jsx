import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import _ from 'lodash'
import * as firebase from 'firebase';

class GradeRow extends Component {
  constructor(props) {
    super(props);

    // let gradeKey = 'temp'

    this.state = {
      'classNameVal': this.props.classNameVal,
      'creditHours': this.props.creditHours,
      'gradeValue': this.props.gradeValue,
      'gradeKey': ''
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const gradesRef = rootRef.child("grades");

    const gradeKey = gradesRef.push().key
    this.setState({gradeKey}, () => console.log('did mount', this.state.gradeKey))

  }

  renderGrades() {
    const gradeValues = [
      'A',
      'B',
      'C',
      'D',
      'F'
    ]

    const gradeList = gradeValues.map(grade => {
      return <option key={grade} value={grade}>{grade}</option>
    })

    return gradeList
  }

  updateData() {
    const rootRef = firebase.database().ref();
    const gradesRef = rootRef.child("grades");

    const returnObject = {
      'classNameVal': this.state.classNameVal,
      'creditHours': this.state.creditHours,
      'gradeValue': this.state.gradeValue,
    }

    gradesRef.update({[this.state.gradeKey]: returnObject})

  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    console.log(name, value)
    this.setState({
      [name]: value
    }, () => this.updateData())
  }


  render() {
    return (
      <div>
        <Form inline>
          <FormGroup controlId="classNameVal">
            <ControlLabel>Class Name</ControlLabel>
            {' '}
            <FormControl name="classNameVal" type="text" placeholder="Calculus I" onChange={this.handleChange} value={this.state.classNameVal}/>
          </FormGroup>
          <FormGroup controlId="creditHours">
            <ControlLabel>Credit Hours</ControlLabel>
            {' '}
            <FormControl name="creditHours" type="text" placeholder="4" onChange={this.handleChange} value={this.state.creditHours}/>
          </FormGroup>
          <FormGroup controlId="gradeValue">
            <ControlLabel>Grade</ControlLabel>
            {' '}
            <FormControl name="gradeValue" componentClass="select" placeholder="A" value={this.state.gradeValue} onChange={this.handleChange}>
              {this.renderGrades()}
            </FormControl>
          </FormGroup>
          {' '}
          <Button bsStyle="danger">X</Button>
        </Form>
      </div>
    )
  }
}

export default GradeRow;
