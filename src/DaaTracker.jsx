import React from 'react';
import { Button } from 'react-bootstrap'
import App from './App'
import _ from 'lodash'
import * as firebase from 'firebase';

class DaaTracker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      people: []
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref()
    const personRef = rootRef.child('person')
    personRef.on('value', snap => {
      _.map(snap.val(), (e) => {
        this.setState({people: this.state.people.concat(e)})
      })
    })

  }

  openModal() {
    this.setState({showModal: true})
  }

  closeModal() {
    this.setState({showModal: false})
  }

  renderPeopleList() {
    const people = this.state.people
    const peopleList = people.map((e) => {
      const curItem = {
        name: e.name,
        age: e.age
      }
      this.setState({people: this.state.people.concat})
    })
    console.log('peoplelist', peopleList)

    return <ul>{peopleList}</ul>
  }


  render(){
    return (
      <div>
        {this.renderPeopleList()}
        <Button bsStyle="primary" onClick={() => this.openModal()}>Make a new Joe</Button>
        <App isOpen={this.state.showModal}/>
      </div>
    )
  }
}

export default DaaTracker;
