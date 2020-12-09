import React, { Component } from 'react'
import Person from './Person/Person';

class Persons extends Component {
    
    // componentWillReceiveProps(props) {
    //     console.log('[Person.js] componentWillReceiveProps', props);
    // }

    static getDerivedStateFromProps(props, state) {
        console.log('[Person.js] getDerivedStateFromProps')
        return state
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('[Persons.js] shouldComponentUpdate');
        if(nextProps.persons !== this.props.persons){
            return true
        }else{
            return false
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!' }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }

    render(){
        console.log('[Persons.js] rendering...');
        return this.props.persons.map( (person, index) => {
            return <Person 
                click={this.props.click.bind(this, index)}
                changed={this.props.change.bind(this, person.id)}
                name={person.name}
                age={person.age} 
                key={person.id}/>
        })
    }    
}

export default Persons