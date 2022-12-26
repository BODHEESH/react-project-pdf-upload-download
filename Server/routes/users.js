const express = require('express');
const { register, userLogin, userDashboard, userSearch, deletePdf, userPagination, userLogout, verifyOtp, resendOTP, uploadPdf } = require('../Controller/usercontroller/userController');
const upload = require('../helpers/multer');
const router = express.Router();





/* Post users Details. */
router.post('/user-register',register);
router.post("/user-login",userLogin)
router.get("/uplodedfiles/user-dashboard/:id",userDashboard)
router.post("/upload",upload.single("pdf"),uploadPdf)
router.delete("/user-logout",userLogout)
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOTP);  

//  under development
router.delete("/delete",deletePdf)
router.post("/user-pagination",userPagination)
router.put("/search",userSearch)






module.exports = router;
