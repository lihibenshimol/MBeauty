import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'adminDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'admin/'

export const adminService = {
    login,
    logout,
    // signup,
    get,
    getLoggedinUser,
    getEmptyCredentials
    // updateScore
}


window.us = adminService

function get(adminId) {
    return storageService.get(STORAGE_KEY, adminId)
}

function login(credentials) {
    return httpService.post(BASE_URL + 'login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login')
        })
}

// function signup({ adminname, password, fullname }) {
//     const admin = { adminname, password, fullname, score: 10000 }
//     return httpService.post(BASE_URL + 'signup', admin)
//         .then(_setLoggedinUser)
// }

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(admin) {
    const adminToSave = { _id: admin._id, fullname: admin.fullname, score: admin.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(adminToSave))
    return adminToSave
}


function getEmptyCredentials(fullname = '', adminname = '', password = 'password') {
    return {
        fullname,
        adminname,
        password,
    }
}
