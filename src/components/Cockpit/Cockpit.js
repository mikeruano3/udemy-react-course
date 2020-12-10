import React, { useEffect, useRef, useContext } from 'react'
import AuthContext from '../../context/auth-context';

const Cockpit = ( props ) => {

    const toogleBtnRef = useRef(null)
    const authContext = useContext(AuthContext);

    // Initial state
    useEffect(() => {
        //alert('First time?')
        console.log('First time?');
        toogleBtnRef.current.click()
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
    if(props.personsLength <= 2){
        assignedClasses.push('red')
    }
    if(props.personsLength <= 1){
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
            <button onClick={props.tooglePerson} style={style} ref={toogleBtnRef}>Toogle</button>
            { 
                props.showPersonState && props.persons
            }
            {
                <AuthContext.Consumer>
                    {context => <button onClick={context.login} style={style}>Log In</button>}
                </AuthContext.Consumer>
            }
            <button onClick={authContext.login} style={style}>Log In useContext</button>
            <p>{props.otherState}</p>
        </div>
    )
}

export default React.memo(Cockpit)