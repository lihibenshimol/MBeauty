
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const UNDO_REMOVE_PRODUCT = 'UNDO_REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const TOGGLE_CART_SHOWN = 'TOGGLE_CART_SHOWN'


const initialState = {
    products: [],
    isLoading: false,
    lastRemovedProduct: null,
    shoppingCart: {},
    // shoppingCart: [],
    isCartShown: false,
}


export function productReducer(state = initialState, action) {
    let products
    let lastRemovedProduct
    let shoppingCart


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

        // Cart
        case TOGGLE_CART_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }
        // case ADD_TO_CART:
        //     shoppingCart = [...state.shoppingCart, action.product]
        //     return { ...state, shoppingCart }
        case ADD_TO_CART:
            const { product } = action;
            const productId = product._id; // Assuming 'id' is the unique identifier of the product

            // If the product is already in the cart, increase the quantity
            if (state.shoppingCart[productId]) {
                const updatedCart = {
                    ...state.shoppingCart,
                    [productId]: state.shoppingCart[productId] + 1,
                };
                return { ...state, shoppingCart: updatedCart };
            }

            // If the product is not in the cart, add it with a quantity of 1
            const newCart = {
                ...state.shoppingCart,
                [productId]: 1,
            };
            return { ...state, shoppingCart: newCart };






        // case REMOVE_FROM_CART:
        //     shoppingCart = state.shoppingCart.filter(p => p._id !== action.productId)
        //     return { ...state, shoppingCart }

        case REMOVE_FROM_CART:

            // Check if the product is in the cart
            if (state.shoppingCart.hasOwnProperty(action.productId)) {
                // If the quantity is greater than 1, decrease the quantity
                if (state.shoppingCart[action.productId] > 1) {
                    const updatedCart = {
                        ...state.shoppingCart,
                        [action.productId]: state.shoppingCart[action.productId] - 1,
                    };
                    return { ...state, shoppingCart: updatedCart };
                }

                // If the quantity is 1 or less, remove the product from the cart
                const { [action.productId]: _, ...updatedCart } = state.shoppingCart;
                return { ...state, shoppingCart: updatedCart };
            }

            // If the product is not in the cart, return the state as it is
            return state;


        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }

        default:
            return state
    }
}


