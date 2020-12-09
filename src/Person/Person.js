import React from 'react'
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

const person = (props) => {
    const style = {
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
    return (
    //<div className="Person" style={style}>
        <StyledDiv>
            <p onClick={() => props.click(props.name)}>Name{props.name}</p>
            <p>Age{props.age}</p>
            <input onChange={props.changed} value={props.name}></input>
        </StyledDiv>
    //</div>
    )
}

export default person