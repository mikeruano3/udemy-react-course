import React, { useReducer, /*useState,*/ useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';
import useHttp from '../../hooks/http'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not be reached')
  }
}

const Ingredients = () => {
  const [userIngredients, dispatchAction] = useReducer(ingredientReducer, [])  
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp()


  useEffect(() => {
  }, []);

  useEffect(() => {
    console.log('RENDERING COMPONENT');
  });

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatchAction({ type: 'DELETE', id: reqExtra })
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT'){
      dispatchAction({ type: 'ADD', 
        ingredient: { id: data.name, ...reqExtra}})
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => (
    dispatchAction({ type: 'SET', ingredients: filteredIngredients})
  ), [])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json',
      'POST', 
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
      )
    }, [sendRequest])

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
    'DELETE',
    null,
    ingredientId,
    'REMOVE_INGREDIENT')
  }, [sendRequest])

  /*
  const clearError = useCallback(() => {
    //setError(null)
    //dispatchHttp({ type: 'CLEAR' })
  }, [])
  */

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler}
    />
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>
        {error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
