const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const path = require('path')
const productController = require('../controllers/product.controller.js')
const authorize = require('../middleware/authorize.js')
const verifyToken = require('../middleware/verifyToken.js')
const upload = require('../util/uploads.js')

//Image upload

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
//   },
// })

// const upload = multer({ storage })

router.route('/product/create').post(
  verifyToken,
  // authorize('admin'),
  upload.array('productPicture'),
  productController.createProduct,
)
router.route('/product/find').get(productController.getProduct)

module.exports = router
