const { Router } = require('express');
const router = Router();

const { get_documents, get_document, document_ByName, post_document, delete_document, updateDocumentName } = require('../controllers/document.controller')
const { document_content, crearTXT } = require('../controllers/fileSystem.controller')
const uploadImage = require('../controllers/imageStorage')
const auth = require('../middlewares/auth')

router.route('/document').get(auth, get_documents );

router.route('/document/:id').get(get_document);

router.route('/document_content/:id').get(document_content);

router.route('/document_ByName/:name').get(document_ByName);

router.route('/new_document').post(  post_document);

router.route('/updateDocumentName').get(  updateDocumentName);

router.route('/delete_document/:id').delete(  delete_document);

router.route('/createText').post(uploadImage.single('image'), crearTXT);

module.exports = router;