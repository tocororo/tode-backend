var fs = require('fs');
var config = require('config')

const Document = require('../models/document.model');
const DocumentVersion = require('../models/document_version.model');

const versionContent = {};

versionContent.crearDirectorio = (doc) => {
    try {
        var dir = config.data_dir + '/' + doc._id;
        fs.mkdir(dir, function (err) {
            if (err) return console.error(err);
        });
    } catch (error) {
        if (error) return console.error(error);
    }
}

/* versionContent.crearTXT = (req, res) => {
    Document.findOne({
        name: req.query.name
    }).then(document => {
        version_body = {
            coment: document.coment,
            document_user: document.document_user,
            document: document,
            image: `${config.temp_dir}/${req.file.filename}`
        }
        DocumentVersion.create(version_body).then(document_version => {
            const dir_path = config.data_dir + '/' + document._id;
            fs.writeFile(`/${dir_path}/${document_version._id}.txt`, `${req.body.text.toString()}`, function (err) {
                if (err) return console.error(err);
            });
        }).catch(err => res.status(400).json(err))
    }).catch(err => res.status(400).json(err))
} */

versionContent.createVersionFile = (document_version, text) => {
    try {
            const dir_path = config.data_dir + '/' + document_version.document;
            fs.writeFile(`/${dir_path}/${document_version._id}`, `${text}`, function (err) {
                if (err) return console.error(err);
            });
    } catch (error) {
        return console.error(error);
    }
}

/* versionContent.crearTXTversion = (res, document_version) => {
    try {
        fs.writeFile(`/${dir_path}/${document_version._id}.txt`, `${document_version.coment}`, function (err) {
            if (err) return console.error(err);
        });
    } catch (error) {
        res.status(400).json(error);
    }
} */

versionContent.document_content = async (req, res) => {
    await Document.findOne({
        _id: req.params.id
    }).then(document => {
        var dir = config.data_dir + '/' + document._id;
        fs.readFile(dir + '/' + `${document._id}.txt`, "utf8", function (err, data) {
            if (err) throw err;
            res.send(data);
        });
    }).catch(err => res.status(400).json(err))

};

versionContent.document_version_content = async (req, res) => {
    await DocumentVersion.findOne({
        _id: req.params.id
    }).then(document_version => {
        var dir = config.data_dir + '/' + document_version.document
        fs.readFile(dir + '/' + `${document_version._id}`, "utf8", function read(err, data) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(data);
        });
    }).catch(err => res.status(400).json(err))

};


module.exports = versionContent;