const express = require('express');
const { adminLogin, getUserDetails, adminfilesDashboard } = require('../Controller/admincontroller/admincontroller');
const router = express.Router();


/* Post users Details. */
router.post('/admin-login', adminLogin);

// /* Get users Details. */
router.get('/allusers', getUserDetails);

// get all files of users
router.get("/uplodedfiles/files-admin",adminfilesDashboard)


/* --------------------------- under developmentx --------------------------- */

// /* change users Status. */
// router.put('/changeStatus', userStatusChange);

// /* Delete All Users. */
// router.put('/deleteAllUsers', deleteAllUserDetails);

module.exports = router;
