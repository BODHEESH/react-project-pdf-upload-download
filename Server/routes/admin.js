const express = require('express');
const { adminLogin, getUserDetails } = require('../Controller/admincontroller/admincontroller');
const router = express.Router();


/* Post users Details. */
router.post('/admin-login', adminLogin);

// /* Get users Details. */
router.get('/allusers', getUserDetails);

// /* change users Status. */
// router.put('/changeStatus', userStatusChange);

// /* Delete one User. */
// router.put('/userDelete', userDelete);

// /* Delete All Users. */
// router.put('/deleteAllUsers', deleteAllUserDetails);

module.exports = router;
