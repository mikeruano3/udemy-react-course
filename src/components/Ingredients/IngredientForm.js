import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator'
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  //const [inputState, setInputState] = useState({ title: '', amount: '' })
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')
  console.log('RENDERING INGREDIENT FORM')

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredTitle, amount: enteredAmount })
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle}
              onChange={evt => setEnteredTitle(evt.target.value)}
            /*
            value={inputState.title} 
            onChange={event => {
              const newValue = event.target.value
              setInputState((prevState) =>({ title: newValue, amount: prevState.amount }))
            }}*/ 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount}
            onChange={evt => setEnteredAmount(evt.target.value)}
            /*onChange={event => {
              value={inputState.amount}
              const newValue = event.target.value
              setInputState((prevState) =>({ title: prevState.title, amount: newValue }))
            }}*/
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            { props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
