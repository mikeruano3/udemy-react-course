"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var redux = require('redux');

var createStore = redux.createStore; //init

var initialState = {
  counter: 0
}; // Reducer

var rootReducer = function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'INC_COUNTER') {
    return _objectSpread({}, state, {
      counter: state.counter + 1
    });
  }

  if (action.type === 'ADD_COUNTER') {
    return _objectSpread({}, state, {
      counter: state.counter + action.value
    });
  }

  return state;
}; // Store


var store = createStore(rootReducer);
console.log(store.getState()); // Subscription

store.subscribe(function () {
  console.log('[Subscription]', store.getState());
}); // Dispatching Action

store.dispatch({
  type: 'INC_COUNTER'
});
store.dispatch({
  type: 'ADD_COUNTER',
  value: 10
});
console.log(store.getState());