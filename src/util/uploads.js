const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
    // cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/
    const extention = path.extname(file.originalname)
    // const extention = path.extname(file.originalname)

    if (supportedImage.test(extention)) {
      cb(null, true)
    } else {
      cb(new Error('Must be a png/jpg image'))
    }
  },
  limits: {
    fileSize: 5000000,
  },
})

module.exports = upload
