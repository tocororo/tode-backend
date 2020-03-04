var multer = require('multer')
const path = require('path');
var config = require('config')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.data_dir )
      
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  var uploadImage = multer({ storage: storage }) 

  module.exports = uploadImage