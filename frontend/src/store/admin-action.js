import { adminService } from '../services/admin-service.js'
import { store } from '../store/store.js'
import { SET_ADMIN, UPDATE_ADMIN_BALANCE, SET_WATCHED_ADMIN} from '../store/admin-reducer.js'

export async function login(credentials) {
    try {
        const admin = await adminService.login(credentials)
        store.dispatch({ type: SET_ADMIN, admin })
        console.log('adminactions = ', admin)
        return admin
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const admin = await adminService.signup(credentials)
        store.dispatch({ type: SET_ADMIN, admin })
        return admin
    } catch (err) {
        console.error('Cannot login:', err)
        throw err
    }
}

export async function logout() {
    try {
        await adminService.logout()
        store.dispatch({ type: SET_ADMIN, admin: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function loadAdmin(adminId) {
    try {
        const admin = await adminService.get(adminId)
        store.dispatch({type: SET_WATCHED_ADMIN, watchedAdmin: admin})
    } catch (err) {
        console.error('Cannot set admin:', err)
        throw err
    }
}
 
export async function updateAdmin(admin) {
    try {
        const savedAdmin = await adminService.put(admin)
        store.dispatch({ type: UPDATE_ADMIN_BALANCE, balance: savedAdmin.balance })
        return savedAdmin
    } catch (err) {
        console.error('Cannot add admin:', err)
        throw err
    }
}