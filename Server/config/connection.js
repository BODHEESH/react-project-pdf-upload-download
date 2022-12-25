const mongoose= require('mongoose')
const connectdb= async()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        },(err,data)=>{    
         if(err){
           console.log("Db Error");
         }else{
           console.log('Db Connected......');
         }
        });
}
    

module.exports ={connectdb}