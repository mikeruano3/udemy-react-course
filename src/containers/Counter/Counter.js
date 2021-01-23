import React, { Component } from 'react';
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions'

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctrState} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={() => this.props.onAddCounter(10)}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctrState)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => {
                        return <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctrState: state.ctr.counterHandler,
        storedResults: state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT,  }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: (val) => dispatch({ type: actionTypes.ADD, val: val }),
        onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
        onStoreResult: (res) => dispatch({ type: actionTypes.STORE_RESULT, result: res}),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, strResultId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);