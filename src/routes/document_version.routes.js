const { Router } = require('express');
const router = Router();
const { get_documents_version, get_document_version, post_document_version} = require('../controllers/document_version.controller')
const { document_version_content } = require('../controllers/fileSystem.controller')

const oauth2 = require('../middlewares/oauth2')

router.route('/document_version').get(oauth2, get_documents_version);

router.route('/document_version/:id').get(get_document_version);

router.route('/document_version_content/:id').get(document_version_content);

router.route('/new_document_version').post(post_document_version);

/* router.route('/edit_document_version/:id').put(put_document_version);

router.route('/delete_document_version/:id').delete(delete_document_version); */


module.exports = router;