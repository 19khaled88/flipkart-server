const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/category.controller.js')
const authorize = require('../middleware/authorize.js')
const verifyToken = require('../middleware/verifyToken.js')
const upload = require('../util/uploads.js')

router
  .route('/category/create')
  .post(upload.single('categoryImage'), categoryController.createCategory)
// router
//   .route('/category/create')
//   .post(verifyToken, authorize('admin'),upload.single('categoryImage'), categoryController.createCategory)

router.route('/category/find').get(categoryController.getCategory)

module.exports = router
