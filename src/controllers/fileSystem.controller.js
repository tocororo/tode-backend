var fs = require('fs');
var config = require('config')
var multer = require('multer')

const Document = require('../models/document.model');
const DocumentVersion = require('../models/document_version.model');

const fileSystem = {};

fileSystem.crearDirectorio = (document) => {
    var dir = config.data_dir + '/' + document._id;
    fs.mkdir(dir, function(err) {
        if(err) return console.error(err);
    });
}
  

fileSystem.crearTXT = (req, res) => {
    
    Document.findOne({name: req.query.name}).then(document => {
        version_body = {
            coment: document.coment,
            document_user: document.document_user,
            document: document
        }
        DocumentVersion.create(version_body).then(function (document_version) {
            const dir_path = config.data_dir + '/' + document_version.document._id + '/' + document_version._id;
             fs.mkdir(dir_path, function(err) {
                 if(err) return console.error(err);
             });
            fs.writeFile(`/${dir_path}/${document_version._id}.txt`, `${document_version.coment}`, function(err) {
                if(err) return console.error(err);            
            });
        });
    }) 
}

fileSystem.crearTXTversion = (document_version) => {
    const dir_path = config.data_dir + '/' + document_version.document._id + '/' + document_version._id;
    fs.mkdir(dir_path, function(err) {
        if(err) return console.error(err);
    });
            fs.writeFile(`/${dir_path}/${document_version._id}.txt`, `${document_version.coment}`, function(err) {
                if(err) return console.error(err);            
            });

    }

fileSystem.document_content = async (req, res, next) => {
    await Document.findOne({ _id: req.params.id }).then(function (document) {
        var dir = config.data_dir + '/' + document._id;        
        fs.readFile(dir + '/' + `${document._id}.txt`, "utf8", function(err, data) {
            if (err) throw err;
            res.send(data);
        });   
    });
};

fileSystem.document_version_content = async (req, res, next) => {
    await DocumentVersion.findOne({ _id: req.params.id }).then(function (document_version) {
        var dir = config.data_dir + '/' + document_version.document._id + '/' + document_version._id        
        fs.readFile(dir + '/' + `${document_version._id}.txt`, "utf8", function(err, data) {
            if (err) throw err;
            res.status(200).json(data);
        });
    });
};

/* fileSystem.uploadImage = () => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, dir)
        },
        filename: function (req, file, cb) {
          cb(null, `${dir}-${Date.now()}`)
        }
      })

      var upload = multer({ storage: storage })   
      return upload
} */
    

module.exports = fileSystem;