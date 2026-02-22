const mongoose=require('mongoose')
require('dotenv').config()
//const monogoUrl='mongodb://localhost:27017/hotels'
const monogoUrl=process.env.MONGO_URI

mongoose.connect(monogoUrl)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('mongoDB connected successfully')
});
db.on('disconnected',()=>{
    console.log("mongoDB disconnected ")
})
db.on('error',(err)=>{
    console.log("MongoDB error :: ",err)
})

module.exports=db
