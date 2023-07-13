import { adminService } from "../services/admin-service.js"
export const SET_ADMIN = 'SET_ADMIN'
export const SET_WATCHED_ADMIN = 'SET_WATCHED_ADMIN'
export const UPDATE_ADMIN_BALANCE = 'UPDATE_ADMIN_BALANCE'



const initialState = {
    admin: adminService.getLoggedinUser(),
}


export function adminReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN:
            return { ...state, admin: action.admin }
        // case SET_WATCHED_ADMIN:
        //     return { ...state, watchedUser: action.watchedUser }
        // case UPDATE_ADMIN_BALANCE:
        //     const admin = { ...state.admin, balance: action.balance }
        //     return { ...state, admin }
        default:
            return state
    }
}