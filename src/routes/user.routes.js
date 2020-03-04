const { Router } = require('express');
const router = Router();
const { get_users, get_user, getUsersToPermission, post_user, put_user, delete_user } = require('../controllers/user.controller')

const oauth2 = require('../middlewares/oauth2')

router.route('/user').get(oauth2, get_users);

router.route('/user/:id').get(get_user);

router.route('/user_topermision').get(oauth2, getUsersToPermission);

router.route('/register').post(post_user);

router.route('/edit_user/:id').put(put_user);

router.route('/delete_user/:id').delete(oauth2, delete_user);


module.exports = router;