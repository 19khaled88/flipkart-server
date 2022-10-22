const { check, validationResult } = require('express-validator')

exports.validateSignUpRequest = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Al least 8 characters are must'),
  check('confirm_password')
    .notEmpty()
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirma password does not match')
      }
      return true
    }),
]
exports.validateSignInRequest = [
  check('email')
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Al least 8 characters are must'),
]

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}
