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

    this.setState({people: []})
    personRef.on('value', snap => {
      _.map(snap.val(), (e) => {
        this.setState({people: this.state.people.concat(e)})
      })
    })

    personRef.on('child_added', snap => {
      _.map(snap.val(), e => {
        this.setState({people: this.state.people.concat(e)})
      })
    })

    personRef.on('child_changed', snap => {
      this.setState({people: []})
      _.map(snap.val(), e => {
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
      const peopleList = this.state.people.map((guy, index) => {
        console.log(guy.name)
        return <p key={index}>{guy.name}</p>
      })

      return peopleList
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
