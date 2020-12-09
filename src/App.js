import { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const App = props => {
  const [ personState, setPersonState ] = useState({
    persons: [
      {id: 'ddfg', name: 'Miguel', age: 34},
      {id: 'gsdag', name: 'Hanna', age: 21},
      {id: 'ytu', name: 'Juan', age: 10}
    ]
  })

  const [ otherState, setOtherState ] = useState('Something else')

  console.log(personState, otherState)

  const  switchNameHandler = (name) => {
    setPersonState({persons: [
      {name: name, age: 34},
      {name: 'Juan', age: 10},
      {name: 'Toby', age: 23}
    ]})
    setOtherState('else')
  }

  const changedNameHandler = (event) => {
    setPersonState({persons: [
      {name: 'AJ', age: 34},
      {name: event.target.value, age: 10},
      {name: 'Toby', age: 23}
    ]})
  }

  const changeNameHandler = (id, event) => {

    const personIndex = personState.persons.findIndex(p =>{
      return p.id === id
    })
    const person = {...personState.persons[personIndex]}
    person.name = event.target.value

    const persons = [...personState.persons]
    persons[personIndex] = person

    setPersonState({ persons: persons})

  }

  const deletePersonHandler = (personIndex) => {
    //    const persons = personState.persons.slice()
    const persons = [...personState.persons]
    persons.splice(personIndex, 1)
    setPersonState({persons: persons})
  }

  const [ showPersonState, setShowPersonState ] = useState(true)
  const tooglePerson = () =>{
    const value = showPersonState
    setShowPersonState(!value)
  }

  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  }

  let persons = showPersonState ?
      <div>
          {
            personState.persons.map( (person, index) => {
              return <Person 
                click={deletePersonHandler.bind(this, index)}
                // eslint-disable-next-line no-restricted-globals
                changed={changeNameHandler.bind(this, person.id)}
                name={person.name}
                age={person.age} 
                key={person.id}/>
            })
          }
          {/*
          <Person 
            name={personState.persons[0].name} 
            age={personState.persons[0].age} 
            click={switchNameHandler} 
            changed={changedNameHandler}/>
          <Person 
            name={personState.persons[1].name} 
            age={personState.persons[1].age} 
            click={switchNameHandler} 
            changed={changedNameHandler}/>
          <Person 
            name={personState.persons[2].name} 
            age={personState.persons[2].age} 
            click={switchNameHandler} 
            changed={changedNameHandler}/>
          */}
      </div>
  : null

  if(showPersonState) {
      style.backgroundColor = 'red' 
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
  }

  const classes = []
  if(personState.persons.length <= 2){
    classes.push('red')
  }
  if(personState.persons.length <= 1){
    classes.push('bold')
  }

  return (
      <div className="App">
        <h1>HI!!</h1>
        <p className={classes}>This is really working!</p>
        <button onClick={tooglePerson} style={style}>Toogle</button>
        { 
          showPersonState && persons
        }
        <p>{otherState}</p>
      </div>
  )
}

export default App


/*************

  state = {
    persons: [
      {name: 'Miguel', age: 34},
      {name: 'Juan', age: 10}
    ]
  }

  switchNameHandler = () => {
    this.setState({persons: [
      {name: 'MIGUEL', age: 34},
      {name: 'Juan', age: 10}
    ]})
  }

  render(){
    return (
      <div className="App">
        <h1>HI!!</h1>
        <button onClick={this.switchNameHandler} >Button</button>
        <Person name={this.state.persons[0].name} age="28"/>
        <Person name={this.state.persons[1].name} age='45'/>
        <Person name={this.state.persons[2].name} age='45'/>
      </div>
    )
  }

 * ******** */