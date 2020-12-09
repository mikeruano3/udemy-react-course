import React, { Component } from 'react'
import styled from 'styled-components'
import './Person.css'

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    '@media (minWidth: 500px)' : {
        width: '450px'
    }
`

class Person extends Component {
    style = {
        width: '50%',
        margin: 'auto',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        padding: '16px',
        textAlign: 'center',
        '@media (minWidth: 500px)' : {
            width: '450px'
        }
    }
    render(){
        return (
            <div className="Person" style={this.style}>
                <p onClick={() => this.props.click(this.props.name)}>
                    Name: {this.props.name}</p>
                <p>Age: {this.props.age}</p>
                <input onChange={this.props.changed} value={this.props.name}></input>
            </div>
        )
    }
}

export default Person