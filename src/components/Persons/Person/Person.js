import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import './Person.css'
import Aux from '../../../hoc/Auxiliar';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

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

    constructor(props){
        super(props)
        this.inputElementRef = React.createRef()
    }

    static contextType = AuthContext

    componentDidMount(){
        //this.inputElement.focus()
        this.inputElementRef.current.focus()
        console.log(this.context.authenticated)
    }

    render(){
        
        /*
        return (
            <div className="Person" style={this.style}>
                <p onClick={() => this.props.click(this.props.name)}>
                    Name: {this.props.name}</p>
                <p>Age: {this.props.age}</p>
                <input onChange={this.props.changed} value={this.props.name}></input>
            </div>
        )*/
        /*
        return [ 
            <p onClick={() => this.props.click(this.props.name)} key='i1'>
                    Name: {this.props.name}</p>,
            <p key='i2'>Age: {this.props.age}</p>,
            <input onChange={this.props.changed} value={this.props.name} key='i3'></input>
        ]
        */
       /*
       return (
           <Aux>
               <p onClick={() => this.props.click(this.props.name)}>
                    Name: {this.props.name}</p>
                <p>Age: {this.props.age}</p>
                <input onChange={this.props.changed} value={this.props.name}></input>
           </Aux>
       )*/
       return (
            <Aux>
                <AuthContext.Consumer>
                    { /*(context) => 
                        context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> 
                        */
                       // Below works due to the contextType property
                        () => this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p> 
                    }
                </AuthContext.Consumer>
                    <p onClick={() => this.props.click(this.props.name)}>
                        Name: {this.props.name}</p>
                    <p>Age: {this.props.age}</p>
                    <input 
                    //ref={(thisInputEl)=>{this.inputElement = thisInputEl}}
                    ref={this.inputElementRef}
                    onChange={this.props.changed} value={this.props.name}></input>
                
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
    
}

export default Person