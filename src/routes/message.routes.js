const { Router } = require('express');
const router = Router();
const { get_message, post_message, get_chatNumber, get_updateMessageState } = require('../controllers/message.controller')

const oauth2 = require('../middlewares/oauth2')

router.route('/message').get(get_message);

router.route('/message').post(post_message);

router.route('/chatNumber').get(oauth2, get_chatNumber);

router.route('/notificationForChat/:id').get(oauth2, get_updateMessageState);

module.exports = router;