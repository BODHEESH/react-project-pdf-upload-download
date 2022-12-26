
const multer= require("multer")
var {google} = require('googleapis')
var GoogleDriveStorage = require("multer-google-drive")


/* -------------------------------------------------------------------------- */
/*              storage change to google drive under development              */
/* -------------------------------------------------------------------------- */


//   "google_api_folder_id": "1q3x5zt9yE_LLG_pQXpJ7Mr_NSX_hrA-X"
// const GOOGLE_API_FOLDER_ID='1q3x5zt9yE_LLG_pQXpJ7Mr_NSX_hrA-X'


// const auth = new google.auth.GoogleAuth({
//     keyFile:"./pdfgallerygooglekey.json",
//     scopes:['https://www.googleapis.com/auth/drive']
//   })



    // //start
    // var drive = google.drive({version: 'v3',auth})
 
    // var uploadpdf = multer({
    //   storage: GoogleDriveStorage({
    //     drive: drive,
    //     parents: GOOGLE_API_FOLDER_ID,

     
    //     fileName: function (req, file, cb) {
         
    //       let filename = `test-${file.originalname}`;
    //       cb(null, filename);
    //      // console.log(file);
        
    //    }
       
    //   })
      
    // }) 









const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,'./public/pdfFiles');
    },
    filename(req,file,callback){

        if(!file.originalname.match(/\.(pdf)$/)) {
            return callback( new Error('Please upload a valid pdf file'))
        }else{
            return callback(null,`${file.originalname}${Date.now()}${file.fieldname}${".pdf"}`);
        }
    },
});


const upload = multer({ storage:storage});






module.exports = upload