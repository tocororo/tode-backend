const { Router } = require('express');
const router = Router();
const { get_notifications, post_notification, get_notificationDocVersion, delete_notification, get_notificationForPermisions, get_notificationNumber} = require('../controllers/notification.controller')

const auth = require('../middlewares/auth')

router.route('/notifications').get(auth, get_notifications);

router.route('/new_notification').post(post_notification);

router.route('/notificationDocVersion').get(auth, get_notificationDocVersion);

router.route('/notificationForPermisions').get(auth, get_notificationForPermisions);

router.route('/notificationNumber').get(auth, get_notificationNumber);

router.route('/delete_notification/:id').get(auth, delete_notification);

module.exports = router;