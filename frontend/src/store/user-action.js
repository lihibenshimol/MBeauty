import { userService } from '../services/user-service.js'
import { store } from './store.js'
import { SET_ADMIN, UPDATE_ADMIN_BALANCE, SET_WATCHED_ADMIN} from '../store/user-reducer.js'

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_ADMIN, user })
        console.log('useractions = ', user)
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_ADMIN, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_ADMIN, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function loadAdmin(userId) {
    try {
        const user = await userService.get(userId)
        store.dispatch({type: SET_WATCHED_ADMIN, watchedAdmin: user})
    } catch (err) {
        console.error('Cannot set user:', err)
        throw err
    }
}
 
export async function updateAdmin(user) {
    try {
        const savedAdmin = await userService.put(user)
        store.dispatch({ type: UPDATE_ADMIN_BALANCE, balance: savedAdmin.balance })
        return savedAdmin
    } catch (err) {
        console.error('Cannot add user:', err)
        throw err
    }
}