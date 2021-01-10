import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if(enteredFilter === inputRef.current.value){
        const query = 
          enteredFilter.length === 0 
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://hooks-test-f2780-default-rtdb.firebaseio.com/ingredients.json' + query).then(res=>{
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
          onLoadIngredients(loadedIngredients)
        })
      }
    }, 500);
    return () =>{
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            ref={inputRef}
            value={enteredFilter}
            onChange={event=> setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;