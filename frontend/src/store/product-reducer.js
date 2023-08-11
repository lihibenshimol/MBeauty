
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const UNDO_REMOVE_PRODUCT = 'UNDO_REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const TOGGLE_CART_SHOWN = 'TOGGLE_CART_SHOWN'
export const LOAD_SAVED_PRODUCTS = 'LOAD_SAVED_PRODUCTS'


const initialState = {
    products: [],
    isLoading: false,
    lastRemovedProduct: null,
    shoppingCart: [],
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

        //todo case ADD_TO_CART:
        //     const { product } = action;
        //     const existingProductIndex = state.shoppingCart.findIndex(
        //         (item) => item.product._id === product._id
        //     );

        //     if (existingProductIndex !== -1) {
        //         // If the product already exists in the cart, update the quantity
        //         const updatedShoppingCart = state.shoppingCart.map((item, index) =>
        //             index === existingProductIndex
        //                 ? { ...item, quantity: item.quantity + 1 }
        //                 : item
        //         );

        //         return { ...state, shoppingCart: updatedShoppingCart };
        //     } else {
        //         // If the product doesn't exist in the cart, add it with quantity 1
        //         const newItem = { product, quantity: 1 };
        //         return { ...state, shoppingCart: [...state.shoppingCart, newItem] };
        //     }

        case ADD_TO_CART:
            const { product } = action;
            const existingProductIndex = state.shoppingCart.findIndex(
                (item) => item.product._id === product._id
            );

            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedShoppingCart = state.shoppingCart.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                // Save the updated cart to session storage
                sessionStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingCart));

                return { ...state, shoppingCart: updatedShoppingCart };
            } else {
                // If the product doesn't exist in the cart, add it with quantity 1
                const newItem = { product, quantity: 1 };

                // Update the shopping cart and save to session storage
                const updatedShoppingCart = [...state.shoppingCart, newItem];
                sessionStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingCart));

                return { ...state, shoppingCart: updatedShoppingCart };
            }




        //todo case REMOVE_FROM_CART:
        //     const productIdToRemove = action.productId;
        //     const existingProductIndexRemove = state.shoppingCart.findIndex(
        //         (item) => item.product._id === productIdToRemove
        //     );

        //     if (existingProductIndexRemove !== -1) {
        //         const existingProduct = state.shoppingCart[existingProductIndexRemove];

        //         if (existingProduct.quantity > 1) {
        //             // If the quantity is greater than 1, decrease the quantity
        //             const updatedShoppingCart = state.shoppingCart.map((item, index) =>
        //                 index === existingProductIndexRemove
        //                     ? { ...item, quantity: item.quantity - 1 }
        //                     : item
        //             );
        //             return { ...state, shoppingCart: updatedShoppingCart };
        //         } else {
        //             // If the quantity is 1 or less, remove the product from the cart
        //             const updatedShoppingCart = state.shoppingCart.filter(
        //                 (item, index) => index !== existingProductIndexRemove
        //             );
        //             return { ...state, shoppingCart: updatedShoppingCart };
        //         }
        //     }

        case REMOVE_FROM_CART:
            const productIdToRemove = action.productId;
            const existingProductIndexRemove = state.shoppingCart.findIndex(
                (item) => item.product._id === productIdToRemove
            );

            if (existingProductIndexRemove !== -1) {
                const existingProduct = state.shoppingCart[existingProductIndexRemove];

                if (existingProduct.quantity > 1) {
                    // If the quantity is greater than 1, decrease the quantity
                    const updatedShoppingCart = state.shoppingCart.map((item, index) =>
                        index === existingProductIndexRemove
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );

                    // Save the updated cart to session storage
                    sessionStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingCart));

                    return { ...state, shoppingCart: updatedShoppingCart };
                } else {
                    // If the quantity is 1 or less, remove the product from the cart
                    const updatedShoppingCart = state.shoppingCart.filter(
                        (item, index) => index !== existingProductIndexRemove
                    );

                    // Save the updated cart to session storage
                    sessionStorage.setItem('shoppingBag', JSON.stringify(updatedShoppingCart));

                    return { ...state, shoppingCart: updatedShoppingCart };
                }
            }
            return state;

            case LOAD_SAVED_PRODUCTS:
                return { ...state, shoppingCart: action.products };
        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }

        default:
            return state
    }
}


