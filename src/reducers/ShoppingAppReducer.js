import {
    ADD_TO_CART,
    ADD_CART_QUANTITY,
    REDUCE_CART_QUANTITY,
    REMOVE_FROM_CART,
    GET_SHOPPING_LIST_SUCCESS,
    GET_SHOPPING_LIST_FAILURE,
    GET_SHOPPING_LIST_PENDING
} from '../actions/ActionTypes'

const initState = {
    items: [],
    itemsFetchPending: true,
    itemsFetchSuccess: false,
    itemsFetchFailure: false,
    itemsFetchError: '',
    filterRange: {
        min: 0,
        max: 0
    },
    addedItems:[],
    totalAmount: 0
}

const ShoppingAppReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let newItem = state.items.find(item =>
                item.id === action.id
            )
    
            let itemExists = state.addedItems.find(item =>
                item.id === newItem.id
            )
    
            if (itemExists) {
                newItem.quantity += 1
                return {
                    ...state,
                    totalAmount: state.totalAmount + newItem.price
                }
            }
            else {
                newItem.quantity = 1
                return {
                    ...state,
                    addedItems: [...state.addedItems, newItem],
                    totalAmount: state.totalAmount + newItem.price
                }
            }
        };
        case GET_SHOPPING_LIST_SUCCESS: {
            let fetchediItems = action.response.map(item => (
                {
                    id: item.id,
                    title: item.name,
                    price: item.price,
                    img: item.img_url,
                    discount: item.discount
                }
            )) 
            return {
                ...state,
                itemsFetchSuccess: true,
                itemsFetchError: false,
                itemsFetchPending: false,
                items: fetchediItems
            }
        }
        case GET_SHOPPING_LIST_FAILURE: {
            return {
                ...state,
                itemsFetchSuccess: false,
                itemsFetchFailure: true,
                itemsFetchPending: false,
                itemsFetchError: action.error.responseJSON ? action.error.responseJSON.message : "No Response from the API"
            }
        }
        case GET_SHOPPING_LIST_PENDING: {
            return {
                ...state,
                itemsFetchFailure: false,
                itemsFetchSuccess:false,
                itemsFetchPending: true,
            }
        }
        case ADD_CART_QUANTITY: {
            return {
                ...state,
                addedItems: action.itemSet
            }
        }
        case REDUCE_CART_QUANTITY: {
            return {
                ...state,
                addedItems: action.itemSet
            }

        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                addedItems: action.itemSet
            }
        }

        default: return state
    }
}

export default ShoppingAppReducer