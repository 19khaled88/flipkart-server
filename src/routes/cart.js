const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart.controller')
const authorize = require('../middleware/authorize.js')
const verifyToken = require('../middleware/verifyToken.js')

router
  .route('/cart/addtocart')
  .post(verifyToken, authorize('admin'), cartController.addToCart)

module.exports = router
