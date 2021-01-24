import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

class Persons extends Component {
    state = {
        persons: []
    }

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Miguel',
            age: Math.floor( Math.random() * 40 )
        }
        this.props.addPersonHandler(newPerson)
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.personsList.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.deletePersonHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        personsList: state.persons
    }
}

const mapDispatchToProps = dispatchAction => {
    return {
        addPersonHandler: (personData) => dispatchAction({ type: actionTypes.ADD_PERSON, payload: { personData: personData } }),
        deletePersonHandler: (personId) => dispatchAction({ type: actionTypes.DELETE_PERSON, payload: { personId: personId } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);