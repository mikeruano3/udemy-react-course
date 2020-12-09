import React, { useEffect } from 'react'

const Cockpit = ( props ) => {
    // Initial state
    useEffect(() => {
        alert('First time?')
        return () =>{
            console.log('[Cockpit.js] cleanup work');
        }
    }, [])

    // Poner dentro de [] lo que queremos que chequee o verifique
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        alert('Persons has changed')
    }, [props.persons])
    
    // si no hay nada corre para cada update cycle
    useEffect(() => {
        return () =>{
            console.log('[Cockpit.js] 2nd work');
        }
    })

    const assignedClasses = []
    if(props.persons.length <= 2){
        assignedClasses.push('red')
    }
    if(props.persons.length <= 1){
        assignedClasses.push('bold')
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

    if(props.showPersonState) {
        style.backgroundColor = 'red' 
        style[':hover'] = {
          backgroundColor: 'salmon',
          color: 'black'
        }
    }

    return (
        <div>
            <h1>HI!! I'm a React App</h1>
            <p className={assignedClasses}>This is really working!</p>
            <button onClick={props.tooglePerson} style={style}>Toogle</button>
            { 
                props.showPersonState && props.persons
            }
            <p>{props.otherState}</p>
        </div>
    )
}

export default Cockpit