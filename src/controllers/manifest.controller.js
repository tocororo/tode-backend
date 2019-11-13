const Manifest = require('../models/manifest.model');

const manifestController = {};

manifestController.get_manifests = async (req, res, next) => {
    await Manifest.find().then(function (manifest) {
        res.send(manifest);
    });
};

manifestController.get_manifest = async (req, res, next) => {
    await Manifest.findOne({ _id: req.params.id }).then(function (manifest) {
        res.send(manifest);
    });
};

manifestController.post_manifest = async (req, res, next) => {
    await Manifest.create(req.body).then(function (manifest) {
        res.send(manifest);
    });
};

manifestController.put_manifest = async (req, res, next) => {
    await Manifest.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Manifest.findOne({ _id: req.params.id }).then(function (manifest) {
            res.send(manifest);

        });
    });
}

manifestController.delete_manifest = async (req, res, next) => {
    await Manifest.findOneAndRemove({ _id: req.params.id }).then(function (manifest) {
        res.send(manifest);
    });
}


module.exports = manifestController;