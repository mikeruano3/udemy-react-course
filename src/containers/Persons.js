import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import { connect } from 'react-redux'
import * as actionTypes from '../store/actions'

class Persons extends Component {
    state = {
        persons: []
    }

    personAddedHandler = (data) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: data.name,
            age: data.age
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