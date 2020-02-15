const { Router } = require('express');
const router = Router();
const { get_notifications, post_notification, get_notificationDocVersion, delete_notification,
        get_notificationForPermisions, get_notificationNumber, get_requestNumber} = require('../controllers/notification.controller')

const oauth2 = require('../middlewares/oauth2')

router.route('/notifications').get(oauth2, get_notifications);

router.route('/new_notification').post(post_notification);

router.route('/notificationDocVersion').get(oauth2, get_notificationDocVersion);

router.route('/notificationForPermisions').get(oauth2, get_notificationForPermisions);

router.route('/notificationNumber').get(oauth2, get_notificationNumber);

router.route('/requestNumber').get(oauth2, get_requestNumber);

router.route('/delete_notification/:id').delete(oauth2, delete_notification);

module.exports = router;