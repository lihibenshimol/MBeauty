const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getProducts, getProductById, addProduct, updateProduct, removeProduct, addProductMsg, removeProductMsg } = require('./product.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', requireAuth, addProduct)
router.put('/:id', requireAuth, updateProduct)
router.delete('/:id', requireAuth, removeProduct)
// router.delete('/:id', requireAuth, requireAdmin, removeProduct)

router.post('/:id/msg', requireAuth, addProductMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeProductMsg)

module.exports = router