const { Router } = require('express');
const router = Router();
const { get_documents, get_document, post_document, put_document, delete_document } = require('../controllers/document.controller')

const auth = require('../middlewares/auth')

router.route('/document').get(get_documents);

router.route('/document/:id').get(get_document);

router.route('/new_document').post(post_document);

router.route('/edit_document/:id').put(put_document);

router.route('/delete_document/:id').delete(delete_document);


module.exports = router;