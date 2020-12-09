import { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props){
    super(props)
    console.log('[App.js] constructor...');
    // this.state
  }

  state = {
    persons: [
      {id: 'ddfg', name: 'Miguel', age: 34},
      {id: 'gsdag', name: 'Hanna', age: 21},
      {id: 'ytu', name: 'Juan', age: 10}
    ],
    otherState: 'Something else',
    showPersonState: true,
    showCockpit:true
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps...', props);
    return state
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount...');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[App.js] componentDidUpdate');
    console.log(snapshot);
  }

  changeNameHandler = (id, event) => {
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id
    })
    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({ persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    //    const persons = personState.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({ persons: persons })
    this.setState({ otherState: 'changed' })
  }

  tooglePerson = () =>{
    const value = this.state.showPersonState
    this.setState({ showPersonState: !value })
  }

  render() {
    console.log('[App.js] render...');
    let persons = this.state.showPersonState ?
    <div>
        <Persons 
          persons={this.state.persons}
          click={this.deletePersonHandler}
          change={this.changeNameHandler}
        />
    </div>
    : null
    //console.log(this.state.persons, this.state.otherState)
    return (
      <div className="App">
        <button onClick={()=>{
          this.setState({showCockpit: false })
        }}>Remove Cockpit</button>
        { this.state.showCockpit ? <Cockpit
          persons={persons ? persons : []}
          showPersonState={this.state.showPersonState}
          tooglePerson={this.tooglePerson}
          otherState={this.state.otherState}
         /> : null
        }
        {persons}
      </div>
    ) 
  }
}

export default App
