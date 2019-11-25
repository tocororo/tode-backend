const { Router } = require('express');
const router = Router();
const { get_documents_version, get_document_version, document_version_content, post_document_version, put_document_version, delete_document_version } = require('../controllers/document_version.controller')

const auth = require('../middlewares/auth')

router.route('/document_version').get(get_documents_version);

router.route('/document_version/:id').get(get_document_version);

router.route('/document_version_content/:id').get(document_version_content);

router.route('/new_document_version').post(post_document_version);

router.route('/edit_document_version/:id').put(put_document_version);

router.route('/delete_document_version/:id').delete(delete_document_version);


module.exports = router;