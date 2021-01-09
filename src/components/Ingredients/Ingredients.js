import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

function Ingredients() {
  const [ userIngredients, setUserIngredients ] = useState([])
  const [isLoaging, setIsLoading] = useState(false)
  const [errorInfo, seterrorInfo] = useState(null)

  /*//This function is now on Search
  useEffect(() => {
    fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json').then(res=>{
    return res.json()
  }).then(resData=>{
    const loadedIngredients = []
    for (const key in resData) {
      loadedIngredients.push({
        id: key,
        title: resData[key].title,
        amount: resData[key].amount
      })
    }
    setUserIngredients(loadedIngredients)
  })
  }, [])*/

  useEffect(() => {
    console.log('Rendering ingredients... ', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' } 
    }).then(res=>{
      setIsLoading(false)
      return res.json()
    }).then(resData=>{
      setUserIngredients(prevIngredientList => [
        ...prevIngredientList, 
        { id: resData.name, ...ingredient }
      ])
    }).catch(error=>{
      seterrorInfo(error.message)
      setIsLoading(false)
    })
  }

  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(`https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response=>{
      setIsLoading(false)
      setUserIngredients(prevIngredient => 
        prevIngredient.filter(ingredient => ingredient.id !== id)
      )
    }).catch(error=>{
      seterrorInfo(error.message)
      setIsLoading(false)
    })
  }

  const clearError = () => {
    seterrorInfo(null)
  }

  return (
    <div className="App">
      {errorInfo && <ErrorModal onClose={clearError}>{errorInfo}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoaging}/>
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
