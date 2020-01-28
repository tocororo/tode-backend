const { Router } = require('express');
const router = Router();
const { get_notifications, post_notification, get_notificationDocVersion, get_notificationNumber} = require('../controllers/notification.controller')

const auth = require('../middlewares/auth')

router.route('/notifications').get(auth, get_notifications);

router.route('/new_notification').post(post_notification);

router.route('/notificationDocVersion').get(auth, get_notificationDocVersion);

router.route('/notificationNumber').get(auth, get_notificationNumber);

module.exports = router;