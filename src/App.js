import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { increment, decrement, auth } from './actions/index'

const App = props => {
  const counter = useSelector(state=>state.counter)
  const login = useSelector(state=>state.login)
  const dispatch = useDispatch()

  return <div className="App">
    <h1>Counter {counter.counter}</h1>
    <button onClick={()=> dispatch(increment())}>+</button>
    <br/>
    <button onClick={()=> dispatch(decrement())}>-</button>
    {login.isLoggedIn? <h3>Logged in </h3>: <h3>Not yet logged in</h3>}
    <button onClick={()=> dispatch(auth())}>auth</button>
  </div>
};

export default App;
