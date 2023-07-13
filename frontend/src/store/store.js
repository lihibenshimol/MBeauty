import { combineReducers, legacy_createStore as createStore } from 'redux'

import { adminReducer } from './admin-reducer.js'
import { productReducer } from './product-reducer.js'


// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const rootReducer = combineReducers({
    productModule: productReducer,
    adminModule: adminReducer
})

export const store = createStore(rootReducer, middleware)

// For debug 
store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})

// setInterval(() => {
//     store.dispatch({ type: 'INCREMENT' })
// }, 1000)
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
