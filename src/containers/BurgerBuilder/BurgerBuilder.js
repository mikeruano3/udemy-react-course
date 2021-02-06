import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import Aux from '../../hoc/Aux_/Aux_'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch()

    const ings = useSelector(state => state.burgerBuilder.ingredients)
    const price = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuthenticated = useSelector(state => state.auth.token !== null)

    const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName))
    const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }


    const disabledInfo = {
        ...ings
    }
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    price={price}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }
    //if (this.state.loading) {
    //    orderSummary = <Spinner />
    //}
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

/*
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,

    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        onIngredientAdded: (ingredientName) => dispatchEvent(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatchEvent(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatchEvent(actions.initIngredients()),
        onInitPurchase: () => dispatchEvent(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatchEvent(actions.setAuthRedirectPath(path))
    }
}
*/

export default (withErrorHandler(burgerBuilder, axios))