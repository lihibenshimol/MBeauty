import { productService } from "../services/product-service.js"
import { SET_PRODUCTS, SET_IS_LOADING, REMOVE_PRODUCT, UNDO_REMOVE_PRODUCT, UPDATE_PRODUCT, ADD_PRODUCT, REMOVE_FROM_CART, ADD_TO_CART } from './product-reducer.js'
import { store } from './store.js'

export function loadProducts(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return productService.query(filterBy)
        .then((products) => {
            store.dispatch({ type: SET_PRODUCTS, products })
            return products
        })
        .catch(err => {
            console.log('Had issues loading product', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeProduct(productId) {
    store.dispatch({ type: REMOVE_PRODUCT, productId })
    return productService.remove(productId)
        .catch(err => {
            store.dispatch({ type: UNDO_REMOVE_PRODUCT })
            console.log('Had issues Removing product', err)
            throw err
        })
}

export function saveProduct(product) {
    const type = (product._id) ? UPDATE_PRODUCT : ADD_PRODUCT
    return productService.save(product)
        .then(savedProduct => {
            store.dispatch({ type, product: savedProduct })
            return savedProduct
        })
        .catch(err => {
            console.error('Cannot add todo:', err)
        })
}

export function addToCart(car) {
    store.dispatch({
        type: ADD_TO_CART,
        car
    })
}

export function removeFromCart(carId) {
    store.dispatch({
        type: REMOVE_FROM_CART,
        carId
    })
}