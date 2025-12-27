const express=require('express')
const db=require('./db')
const bodyParser=require('body-parser')
require('dotenv').config();
const app=express()
app.use(bodyParser.json())
PORT=process.env.PORT ||3000

app.get("/" ,(req,res)=>{
    res.send('Node js backend ready ')
})

const PersonRoutes=require('./Routes/PersonRoutes');
const menuRoutes=require('./Routes/MenuRoutes')


app.use('/person',PersonRoutes)
app.use('/menu',menuRoutes)


app.listen(PORT,()=>{
    console.log(`your port is serving on the  PORT ${PORT}`)
})