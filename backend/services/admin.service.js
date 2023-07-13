
const dbService = require('./db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
// const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByAdminname,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('admin')
        var admins = await collection.find(criteria).toArray()
        admins = admins.map(admin => {
            delete admin.password
            admin.createdAt = ObjectId(admin._id).getTimestamp()
            // Returning fake fresh data
            // admin.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return admin
        })
        return admins
    } catch (err) {
        logger.error('cannot find admins', err)
        throw err
    }
}


async function getById(adminId) {
    try {
        const collection = await dbService.getCollection('admin')
        const admin = await collection.findOne({ _id: ObjectId(adminId) })
        delete admin.password

        admin.givenReviews = await reviewService.query({ byAdminId: ObjectId(admin._id) })
        admin.givenReviews = admin.givenReviews.map(review => {
            delete review.byAdmin
            return review
        })

        return admin
    } catch (err) {
        logger.error(`while finding admin by id: ${adminId}`, err)
        throw err
    }
}
async function getByAdminname(adminname) {

    try {
        const collection = await dbService.getCollection('admin')
        const admin = await collection.findOne({adminname})
        return admin
    } catch (err) {
        throw err
    }
}

async function remove(adminId) {
    try {
        const collection = await dbService.getCollection('admin')
        await collection.deleteOne({ _id: ObjectId(adminId) })
    } catch (err) {
        logger.error(`cannot remove admin ${adminId}`, err)
        throw err
    }
}

async function update(admin) {
    try {
        // peek only updatable properties
        const adminToSave = {
            _id: ObjectId(admin._id), // needed for the returnd obj
            fullname: admin.fullname,
            score: admin.score,
        }
        const collection = await dbService.getCollection('admin')
        await collection.updateOne({ _id: adminToSave._id }, { $set: adminToSave })
        return adminToSave
    } catch (err) {
        logger.error(`cannot update admin ${admin._id}`, err)
        throw err
    }
}

async function add(admin) {
    try {
        // peek only updatable fields!
        const adminToAdd = {
            adminname: admin.adminname,
            password: admin.password,
            fullname: admin.fullname,
            imgUrl: admin.imgUrl,
            score: 100
        }
        const collection = await dbService.getCollection('admin')
        await collection.insertOne(adminToAdd)
        return adminToAdd
    } catch (err) {
        logger.error('cannot add admin', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                adminname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}



