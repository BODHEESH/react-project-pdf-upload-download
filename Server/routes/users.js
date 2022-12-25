const express = require('express');
const { register, userLogin, userDashboard, userSearch, download, deletePdf, userPagination, userLogout, verifyOtp, resendOTP, uploadPdf, searchFile } = require('../Controller/usercontroller/userController');
const upload = require('../helpers/multer');
const router = express.Router();





/* Post users Details. */
router.post('/user-register',register);
router.post("/user-login",userLogin)
router.get("/uplodedfiles/user-dashboard/:id",userDashboard)
router.post("/search",userSearch)
router.post("/upload",upload.single("pdf"),uploadPdf)
router.get("/download/:id",download)
router.delete("/delete/:id",deletePdf)
router.post("/user-pagination",userPagination)
router.delete("/user-logout",userLogout)
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOTP);  
router.post('/search/file',searchFile)




module.exports = router;
