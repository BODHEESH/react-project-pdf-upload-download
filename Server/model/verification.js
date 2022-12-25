const mongoose = require('mongoose')
const verificationSchema = new mongoose.Schema({
   userId:String,
   Otp:String,
   Created:Date,
   Expiry:Date
})
const verification = mongoose.model('verification', verificationSchema)
module.exports = verification