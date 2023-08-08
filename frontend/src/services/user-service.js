import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
    login,
    logout,
    // signup,
    get,
    getLoggedinUser,
    getEmptyCredentials
    // updateScore
}


window.us = userService

function get(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login(credentials) {
    return httpService.post('auth/login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login here')
        })
}
// function login(credentials) {
//     return httpService.post(BASE_URL + 'login', credentials)
//         .then(_setLoggedinUser)
//         .catch(err => {
//             console.log('err:', err)
//             throw new Error('Invalid login')
//         })
// }

// function signup({ username, password, fullname }) {
//     const user = { username, password, fullname, score: 10000 }
//     return httpService.post(BASE_URL + 'signup', user)
//         .then(_setLoggedinUser)
// }

function logout() {
    return httpService.post('auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    console.log('user??? = ', user)
    const userToSave = { _id: user._id, fullname: user.fullname, user: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials(fullname = '', username = '', password = 'password') {
    return {
        fullname,
        username,
        password,
    }
}
