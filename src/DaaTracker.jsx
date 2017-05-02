import React from 'react';
import { Button } from 'react-bootstrap'
import App from './App'
import GradeRow from './GradeRow'
import _ from 'lodash'
import * as firebase from 'firebase';

class DaaTracker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      people: [],
      gradeRows: {}
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref()
    const personRef = rootRef.child('person')
    const gradeRef = rootRef.child('grades')

    personRef.on('value', snap => {
      this.setState({people: []})
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

    personRef.on('child_removed', snap => {
      this.setState({people: [], showModal: false})
      _.map(snap.val(), e => {
        this.setState({people: this.state.people.concat(e)})
      })
    })

    gradeRef.on('value', snap => {
      this.setState({gradeRows: {}}, () => {
        const gradeList = snap.val()

        Object.keys(gradeList).map((key) => {
          gradeList[key].gradeKey = key
          console.log('value', gradeList[key])

          const tempGradeObject = this.state.gradeRows
          tempGradeObject[key] = gradeList[key]

          this.setState({gradeRows: tempGradeObject}, () => {
            console.log('valueguy', this.state.gradeRows)
          })
        })
      })
    })

    gradeRef.on('child_added', snap => {
      this.setState({gradeRows: {}}, () => {
        const gradeList = snap.val()

        Object.keys(gradeList).map((key) => {
          gradeList[key].gradeKey = key
          console.log('value', gradeList[key])

          const tempGradeObject = this.state.gradeRows
          tempGradeObject[key] = gradeList[key]

          this.setState({gradeRows: tempGradeObject}, () => {
            console.log('valueguy', this.state.gradeRows)
          })
        })
      })
    })

    gradeRef.on('child_changed', snap => {
      this.setState({gradeRows: {}}, () => {
        const gradeList = snap.val()

        Object.keys(gradeList).map((key) => {
          gradeList[key].gradeKey = key
          console.log('value', gradeList[key])

          const tempGradeObject = this.state.gradeRows
          tempGradeObject[key] = gradeList[key]

          this.setState({gradeRows: tempGradeObject}, () => {
            console.log('valueguy', this.state.gradeRows)
          })
        })
      })
    })

    gradeRef.on('child_removed', snap => {
      this.setState({gradeRows: {}}, () => {
        const gradeList = snap.val()

        Object.keys(gradeList).map((key) => {
          gradeList[key].gradeKey = key
          console.log('value', gradeList[key])

          const tempGradeObject = this.state.gradeRows
          tempGradeObject[key] = gradeList[key]

          this.setState({gradeRows: tempGradeObject}, () => {
            console.log('valueguy', this.state.gradeRows)
          })
        })
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
        return <p key={index}>{guy.name} - {guy.age}</p>
      })

      return peopleList
  }

  renderGradeRowList() {
    if(this.state.gradeRows.length > 0) {
      console.log('rendergraderowlist', this.state.gradeRows)

      const gradeRowsOutput = this.state.gradeRows.map((row, index) => {
        return <GradeRow key={index} gradeKey={row.gradeKey} classNameVal={row.classNameVal} creditHours={row.creditHours} gradeValue={row.gradeValue}/>
      })
      return gradeRowsOutput
    }//
    // } else {
    //   return <GradeRow key={0} classNameVal="" creditHours="" gradeValue=""/>
    // }
  }

  render(){
    return (
      <div>
        {this.renderPeopleList()}
        {this.renderGradeRowList()}
        <Button bsStyle="primary" onClick={() => this.openModal()}>Make a new Joe</Button>
        <App isOpen={this.state.showModal}/>
      </div>
    )
  }
}

export default DaaTracker;
