import React, { useReducer, /*useState,*/ useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

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

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...curHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...curHttpState, error: null }
    default:
      throw new Error('Should not be reached')
  }
}

const Ingredients = () => {
  const [userIngredients, dispatchAction] = useReducer(ingredientReducer, [])
  const [ httpState, dispatchHttp ] = useReducer(httpReducer, {laoding: false, error: null})
  //const [ userIngredients, setUserIngredients ] = useState([])
  //const [ isLoading, setIsLoading ] = useState(false)
  //const [ error, setError ] = useState(false)

  useEffect(() => {
    /*
    fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = []
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngredients)
    })*/
    
  }, []);

  useEffect(() => {
    console.log('RENDERING COMPONENT');
  });

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => (
    //setUserIngredients(filteredIngredients)
    dispatchAction({ type: 'SET', ingredients: filteredIngredients})
  ), [])

  const addIngredientHandler = useCallback(ingredient => {
    //setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      //setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      return response.json()
    })
    .then(response => {
      /*setUserIngredients(prevIngredients => 
        [...prevIngredients, 
          { id: response.name, ...ingredient}]
      )*/
      dispatchAction({ type: 'ADD', ingredient: { id: response.name, ...ingredient}})
    }).catch(error => {
      //setIsLoading(false)
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    })
  }, [])

  const removeIngredientHandler = useCallback(ingredientId => {
    //setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch(`https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      //setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      /*setUserIngredients(prevIngredients => 
        prevIngredients.filter(ing => ing.id !== ingredientId)  
      )*/
      dispatchAction({ type: 'DELETE', id: ingredientId })
    }).catch(error => {
      //setError(error.message)
      //setIsLoading(false)
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    })
    
  }, [])

  const clearError = useCallback(() => {
    //setError(null)
    dispatchHttp({ type: 'CLEAR' })
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler}
    />
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>
        {httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
