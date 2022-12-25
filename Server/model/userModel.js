
const mongoose = require("mongoose")
const { ref } = require("yup")

const fileSchema  = mongoose.Schema({
    title:String,
    fileName:String,
    time:Number
})


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    files:[{
        type:fileSchema,
    }],
},{ timestamps: true })

const User = mongoose.model("user",userSchema)
module.exports = User