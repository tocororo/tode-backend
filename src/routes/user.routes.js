const { Router } = require('express');
const router = Router();
const { get_users, get_user, post_user, put_user, delete_user } = require('../controllers/user.controller')

const auth = require('../middlewares/auth')

router.route('/user').get(get_users);

router.route('/user/:id').get(get_user);

router.route('/register').post(post_user);

router.route('/edit_user/:id').put(put_user);

router.route('/delete_user/:id').delete(auth, delete_user);


module.exports = router;