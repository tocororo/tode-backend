const DocumentVersion = require('../models/document_version.model');
const Document = require('../models/document.model');
const Notification = require('../models/notification.model');
const Permision = require('../models/permision.model');
const {
    createVersionFile
} = require('./versionContent.controller')
var config = require('config')

const document_versionController = {};

document_versionController.get_documents_version = async (req, res, next) => {
    var docs, perms, permsShared, docs_version, versiones, last, lastShared

    await Document.find().populate('document_user').then(function (document) {
        docs = document;
    })

    await Permision.find().populate('withPermisions').populate('document').then(function (permision) {
        // perm = permision
        perms = new Array(permision.length);
        permsShared = new Array(permision.length)

        docs.forEach(doc => {
            permision.forEach((perm, index) => {
                if (req.user && req.user._id.toString() === perm.withPermisions._id.toString() && req.user._id.toString() === perm.document.document_user.toString()) {
                    perms[index] = perm;
                }
                if (req.user && req.user._id.toString() === perm.withPermisions._id.toString() && req.user._id.toString() !== perm.document.document_user.toString() && perm.requestAcepted.toString() === true && perm.document._id.toString() === doc._id.toString()) {
                    permsShared[index] = perm
                }
            });
        });
    });

    await DocumentVersion.find().populate('document_user').populate('document').then(function (document_version) {
        docs_version = document_version 

        last = new Array(perms.length);
            perms.forEach((perm, perm_index) => {
                versiones = new Array();
                document_version.forEach((vers, vers_index) => {
                    if (perm.document._id.toString() === vers.document._id.toString()) {
                        versiones[vers_index] = vers;
                    }
                })
                last[perm_index] = versiones[versiones.length - 1];
            })

            lastShared = new Array(permsShared.length);
                permsShared.forEach((perm, perm_index) => {
                    versiones = new Array();
                    document_version.forEach((vers, vers_index) => {
                        if (perm.document._id.toString() === vers.document._id.toString()) {
                            versiones[vers_index] = vers;
                        }
                    })
                    lastShared[perm_index] = versiones[versiones.length - 1];
                })
        })                   
        res.status(200).json({
            docs_version: docs_version,
            last: last,
            lastShared: lastShared
        })
};

document_versionController.get_document_version = async (req, res, next) => {
    await DocumentVersion.findOne({
            _id: req.params.id
        }).populate('document_user').populate('document').then(function (document_version) {
            res.status(200).json(document_version)
        })
        .catch(err => res.status(400).json(err));
};

document_versionController.post_document_version = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    let images = new Array()
    req.files.forEach((files, index) =>
        images[index] = `${config.images_dir}/${files.filename}`
    )

    version_body = {
        coment: req.body.comment,
        document_user: req.body.document_user,
        document: req.body.document,
        images: images
    }
    await DocumentVersion.create(version_body).then(document_version => {
            createVersionFile(document_version, obj.text)
            res.status(200).json(document_version)
        })
        .catch(err => res.status(400).json(err));
};

document_versionController.put_document_version = async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    let images = new Array()
    req.files.forEach((files, index) =>
        images[index] = `${config.images_dir}/${files.filename}`
    )

    version_body = {
        coment: req.body.comment,
        document_user: req.body.document_user,
        document: req.body.document,
        images: images
    }
    await DocumentVersion.create(version_body).then(document_version => {
        createVersionFile(document_version, obj.text)
        Permision.find({
                document: document_version.document
            }).populate('document').then(permision => {
                permision.forEach((perm) => {
                    if (perm.withPermisions.toString() !== document_version.document_user.toString()) {
                        notification_body = {
                            notification: `Se ha creado una nueva version del documento ${perm.document.name}`,
                            toUser: perm.withPermisions,
                            document: perm.document._id,
                            document_version: document_version._id
                        }
                        Notification.create(notification_body)
                    }
                })
                res.status(200).json(document_version)
            })
            .catch(err => res.status(400).json(err));
    })
}

/* document_versionController.delete_document_version = async (req, res, next) => {
    await DocumentVersion.findOneAndRemove({ _id: req.params.id }).then(function (document_version) {
        res.send(document_version);
    });
} */


module.exports = document_versionController;