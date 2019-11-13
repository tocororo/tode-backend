const { Router } = require('express');
const router = Router();
const { get_manifests, get_manifest, post_manifest, put_manifest, delete_manifest } = require('../controllers/user.controller')

const auth = require('../middlewares/auth')

router.route('/mainfests').get(get_manifests);

router.route('/manifest/:id').get(get_manifest);

router.route('/new_manifest').post(post_manifest);

router.route('/edit_manifest/:id').put(put_manifestuser);

router.route('/delete_manifest/:id').delete(auth, delete_manifest);


module.exports = router;