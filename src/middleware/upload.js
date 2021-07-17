const multer = require('multer')

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.endsWith('.png') &&
      !file.originalname.endsWith('.jpeg') &&
      !file.originalname.endsWith('.jpg')
    ) {
      return cb(new Error('please uplaod an image!'))
    }

    cb(undefined, true)
  },
})

module.exports = upload
