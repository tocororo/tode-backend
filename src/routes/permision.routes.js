const { Router } = require('express');
const router = Router();
const { get_permisions, post_permision, delete_permision, cancelPermisionShared } = require('../controllers/permision.controller')

const oauth2 = require('../middlewares/oauth2')

router.route('/permision/:id').get(oauth2, get_permisions);

router.route('/new_permision').post(post_permision);

router.route('/cancelPermisionShared/:id').delete(cancelPermisionShared);

router.route('/delete_permision/:id').delete(delete_permision);


module.exports = router;