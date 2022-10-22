const jwt = require('jsonwebtoken')

const { promisify } = require('util')

module.exports = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(' ')[1]
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'you are not logged in',
      })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid token',
    })
  }
}
