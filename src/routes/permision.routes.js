const { Router } = require('express');
const router = Router();
const { get_permisions, post_permision, delete_permision } = require('../controllers/permision.controller')

const auth = require('../middlewares/auth')

router.route('/permision').get(auth, get_permisions);

router.route('/new_permision').post(post_permision);

router.route('/delete_permision/:id').delete(delete_permision);


module.exports = router;