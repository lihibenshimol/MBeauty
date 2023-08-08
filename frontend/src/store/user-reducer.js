import { userService } from "../services/user-service.js"
export const SET_ADMIN = 'SET_ADMIN'
export const SET_WATCHED_ADMIN = 'SET_WATCHED_ADMIN'
export const UPDATE_ADMIN_BALANCE = 'UPDATE_ADMIN_BALANCE'



const initialState = {
    user: userService.getLoggedinUser(),
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN:
            return { ...state, user: action.user }
        // case SET_WATCHED_ADMIN:
        //     return { ...state, watchedUser: action.watchedUser }
        // case UPDATE_ADMIN_BALANCE:
        //     const user = { ...state.user, balance: action.balance }
        //     return { ...state, user }
        default:
            return state
    }
}