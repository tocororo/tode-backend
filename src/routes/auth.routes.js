const { Router } = require('express');
const router = Router();
const { post_user_auth, get_user_auth } = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')

router.route('/register_auth').post(post_user_auth);

router.route('/user_auth').get(auth, get_user_auth);

module.exports = router;