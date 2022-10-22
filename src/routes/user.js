const express = require('express')
const userController = require('../controllers/user.controller')
const authorize = require('../middleware/authorize')
const {
  isRequestValidated,
  validateSignInRequest,
  validateSignUpRequest,
} = require('../middleware/validator')
const verifyToken = require('../middleware/verifyToken.js')

const router = express.Router()

// router.post(
//   '/signin',
//   validateSignInRequest,
//   isRequestValidated,
//   userController.signin,
// )
router
  .route('/signin')
  .post(validateSignInRequest, isRequestValidated, userController.signin)

// router.post(
//   '/signup',
//   validateSignUpRequest,
//   isRequestValidated,
//   userController.signup,
// )
router
  .route('/signup')
  .post(validateSignUpRequest, isRequestValidated, userController.signup)

router.route('/test').get(verifyToken, authorize('admin'), userController.test)
module.exports = router
