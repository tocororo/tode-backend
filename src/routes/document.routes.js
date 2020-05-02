const { Router } = require('express');
const router = Router();

const { get_documents, get_document, document_ByName, post_document, delete_document, updateDocumentName } = require('../controllers/document.controller')
const { document_content } = require('../controllers/versionContent.controller')
const oauth2 = require('../middlewares/oauth2')

router.route('/document').get(oauth2, get_documents );

router.route('/document/:id').get(oauth2, get_document);

router.route('/document_content/:id').get(document_content);

router.route('/document_ByName/:name').get(document_ByName);

router.route('/new_document').post(  post_document);

router.route('/updateDocumentName').get(  updateDocumentName);

router.route('/delete_document/:id').delete( oauth2, delete_document);

module.exports = router;