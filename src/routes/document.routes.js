const { Router } = require('express');
const router = Router();

const { get_documents, get_document, post_document, document_ByName } = require('../controllers/document.controller')
const { document_content, crearTXT } = require('../controllers/fileSystem.controller')
const uploadImage = require('../controllers/imageStorage')
const auth = require('../middlewares/auth')

router.route('/document').get(auth, get_documents );

router.route('/document/:id').get(get_document);

router.route('/document_content/:id').get(document_content);

router.route('/new_document').post(  post_document);

router.route('/createText').post(uploadImage.single('image'), crearTXT);

module.exports = router;