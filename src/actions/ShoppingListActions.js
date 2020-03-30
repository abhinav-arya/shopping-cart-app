import {
    ADD_TO_CART,
    ADD_CART_QUANTITY,
    REDUCE_CART_QUANTITY,
    REMOVE_FROM_CART,
    GET_SHOPPING_LIST_SUCCESS,
    GET_SHOPPING_LIST_FAILURE,
    GET_SHOPPING_LIST_PENDING
} from './ActionTypes'
import getShoppingList from '../api/MyJsonDataService'

export const addCartQnty = (itemSet) => {
    return { type: ADD_CART_QUANTITY, itemSet}
}

export const reduceCartQnty = (itemSet) => {
    return { type: REDUCE_CART_QUANTITY, itemSet }
}

export const removeCartItem = (itemSet) => {
    return { type: REMOVE_FROM_CART, itemSet }
}

export const fetchShoppingListSuccess = (response) => {
    return { type: GET_SHOPPING_LIST_SUCCESS, response }
}

export const fetchShoppingListFailure = (error) => {
    return { type: GET_SHOPPING_LIST_FAILURE, error}
}

export const addToCartComplete = (id) => {
    return { type: ADD_TO_CART, id }
}

export const fetchShoppingListPending = () => {
    return { type: GET_SHOPPING_LIST_PENDING }
}

export const fetchShoppingList = () => {
    return (dispatch) => {
        // dispatch(fetchShoppingListPending())
        return (
            getShoppingList()
                .then((response) => {
                    dispatch(fetchShoppingListSuccess(response))
                })
                .catch((error) => {
                    dispatch(fetchShoppingListFailure(error))
                })
        )
    }
}

export const addToCart = (id) => {
    return (dispatch) => {
        dispatch(addToCartComplete(id))
    }
}

export const addCartQuantity = (itemSet) => {
    return (dispatch) => {
        dispatch(addCartQnty(itemSet))
    }
}

export const reduceCartQuantity = (itemSet) => {
    return (dispatch) => {
        dispatch(reduceCartQnty(itemSet))
    }
}

export const removeFromCart = (itemSet) => {
    return (dispatch) => {
        dispatch(removeCartItem(itemSet))
    }
}
