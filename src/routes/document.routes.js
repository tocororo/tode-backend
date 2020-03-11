const { Router } = require('express');
const router = Router();/* 
var multer = require('multer');
var config = require('config');
var uuidv4 = require('uuid/v4'); */

const { get_documents, get_document, document_ByName, post_document, delete_document, updateDocumentName } = require('../controllers/document.controller')
const { document_content } = require('../controllers/versionContent.controller')
const oauth2 = require('../middlewares/oauth2')

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.temp_dir);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    limits:{fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

 */
router.route('/document').get(oauth2, get_documents );

router.route('/document/:id').get(oauth2, get_document);

router.route('/document_content/:id').get(document_content);

router.route('/document_ByName/:name').get(document_ByName);

router.route('/new_document').post(  post_document);

router.route('/updateDocumentName').get(  updateDocumentName);

router.route('/delete_document/:id').delete( oauth2, delete_document);

//router.route('/createText').post(upload.single('image'), crearTXT);

module.exports = router;