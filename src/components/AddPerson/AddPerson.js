import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [name, setname] = useState('')
    const [age, setage] = useState('')

    return (
        <div className="AddPerson">
            <input value={name} placeholder="Name" onChange={(e)=> setname(e.target.value)}/>
            <input value={age} placeholder="Age" onChange={(e)=> setage(e.target.value)} type="number"/>
            <button onClick={() => props.personAdded({name, age})}>Add Person</button>
        </div>
    )
}

export default addPerson;