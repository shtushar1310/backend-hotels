const express=require('express')
const db=require('./db')
const bodyParser=require('body-parser')
const passport=require('./auth')
require('dotenv').config();


const app=express()
app.use(bodyParser.json())
PORT=process.env.PORT ||3000


// middleware function 
const logRequest=(req,res, next)=>{
    console.log(`[${new Date().toLocaleString()}]request made to : ${req.originalUrl}`)
    next()
}
//authentication doing by passport js

app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get("/",localAuthMiddleware,(req,res)=>{
    res.send('Node js backend ready ')
})



const PersonRoutes=require('./Routes/PersonRoutes');
const menuRoutes=require('./Routes/MenuRoutes')


app.use('/person',logRequest,PersonRoutes)
app.use('/menu',logRequest,menuRoutes)


app.listen(PORT,()=>{
    console.log(`your port is serving on the  PORT ${PORT}`)
})