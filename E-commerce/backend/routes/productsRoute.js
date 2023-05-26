const express = require('express')
const {getProduct,getProducts} = require('../controllers/productController')
const router = express.Router()

//get route for all products
router.route('/products').get(getProducts)

//get route for single product
router.route('/products/:id').get(getProduct)

module.exports = router;