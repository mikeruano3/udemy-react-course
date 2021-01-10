import React, { useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [ ...currentIngredients, action.ingredient ]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id) 
    default:
      throw new Error('Should not get here!')
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
      throw new Error('Should not get here!')
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })
  //const [ userIngredients, setUserIngredients ] = useState([])
  //const [isLoaging, setIsLoading] = useState(false)
  //const [errorInfo, seterrorInfo] = useState(null)

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
    //setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({ type: 'SEND' })
    fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' } 
    }).then(res=>{
      dispatchHttp({ type: 'RESPONSE' })
      return res.json()
    }).then(resData=>{
      /*
      setUserIngredients(prevIngredientList => [
        ...prevIngredientList, 
        { id: resData.name, ...ingredient }
      ])*/
      dispatch({ type: 'ADD', ingredient: { id: resData.name, ...ingredient }})
    }).catch(error=>{
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    })
  }

  const removeIngredientHandler = id => {
    dispatchHttp({ type: 'SEND' })
    fetch(`https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response=>{
      dispatchHttp({ type: 'RESPONSE' })
      //setUserIngredients(prevIngredient => prevIngredient.filter(ingredient => ingredient.id !== id))
      dispatch({ type: 'DELETE',  id: id})
    }).catch(error=>{
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    })
  }

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' })
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
