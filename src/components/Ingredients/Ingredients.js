import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ userIngredients, setUserIngredients ] = useState([])

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredientList => [
      ...prevIngredientList, 
      { id: Math.random.toString(), ...ingredient }
    ])
  }

  const removeIngredientHandler = id => {
    setUserIngredients(userIngredients.filter(function(value, index, arr){ 
      return value.id !== id
    }))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
