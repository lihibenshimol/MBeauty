const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const adminService = require('./admin.service')
// const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(adminname, password) {

    const admin = await adminService.getByAdminname(adminname)
    if (!admin) return Promise.reject('Invalid adminname or password')

    delete admin.password
    admin._id = admin._id.toString()
    return admin
}
   

async function signup({adminname, password, fullname, imgUrl}) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with adminname: ${adminname}, fullname: ${fullname}`)
    if (!adminname || !password || !fullname) return Promise.reject('Missing required signup information')

    const adminExist = await adminService.getByAdminname(adminname)
    if (adminExist) return Promise.reject('Adminname already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return adminService.add({ adminname, password: hash, fullname, imgUrl })
}


function getLoginToken(admin) {
    const adminInfo = {_id : admin._id, fullname: admin.fullname, isAdmin: admin.isAdmin}
    return cryptr.encrypt(JSON.stringify(adminInfo))    
}

function validateToken(loginToken) {

    console.log('loginToken = ', loginToken)

    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinAdmin = JSON.parse(json)
        return loggedinAdmin
    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}




// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()