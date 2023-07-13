
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const UNDO_REMOVE_PRODUCT = 'UNDO_REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'


const initialState = {
    products: [],
    isLoading: false,
    lastRemovedProduct: null,
}


export function productReducer(state = initialState, action) {
    let products
    let lastRemovedProduct

    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_PRODUCT:
            lastRemovedProduct = state.products.find(t => t._id === action.productId)
            products = state.products.filter(t => t._id !== action.productId)
            return { ...state, products, lastRemovedProduct }

        case UNDO_REMOVE_PRODUCT:
            ({ lastRemovedProduct } = state)
            products = [lastRemovedProduct, ...state.products]
            return { ...state, products, lastRemovedProduct: null }

        case ADD_PRODUCT:
            products = [...state.products, action.product]
            return { ...state, products }

        case UPDATE_PRODUCT:
            products = state.products.map(product => product._id === action.product._id ? action.product : product)
            return { ...state, products }

        // // Cart
        // case TOGGLE_CART_SHOWN:
        //     return { ...state, isCartShown: !state.isCartShown }
        // case ADD_TO_CART:
        //     shoppingCart = [...state.shoppingCart, action.car]
        //     return { ...state, shoppingCart }
        // case REMOVE_FROM_CART:
        //     shoppingCart = state.shoppingCart.filter(c => c._id !== action.carId)
        //     return { ...state, shoppingCart }
        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }

        default:
            return state
    }
}


