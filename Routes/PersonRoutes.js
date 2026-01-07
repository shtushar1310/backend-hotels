const express=require('express')
const Person = require('../models/Person')
const {jwtAuthMiddleware,generateToken} =require('../jwtMiddleware')

const router=express.Router()


//creating the person
router.post('/signup',async(req,res)=>{
    try {
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save() 
        console.log('data saved')
        const payload={
            id:response.id,
            email:response.email
        }
        const token= await generateToken(payload)
        console.log("Token is : ",token)
        res.status(200).json({response:response,token:token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }

})


//creating the login routes

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
          const user=await Person.findOne({email:email})  

          if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"invalid username or password"})
          }

          const payload={
            id:user.id,
            email:user.email
          }
          const token=await generateToken(payload)

          res.status(201).json({token:token})
    } catch (error) {
       console.log(error) 
       res.status(500).json({error:"internal server error"})
    }
})





// to get all the details 
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const data=await Person.find()
        console.log('data fetched successfully')
        res.status(200).json(data)  
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
})


// to get the profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData=req.user
        console.log('userdata is :',userData)
        const userId=userData.id
        const user=await Person.findById(userId)
        res.status(200).json(user)

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})


//To call parameterised API call
router.get('/:workType',async(req,res)=>{
    try {
        const data=req.params.workType;
        if(data =='chef' || data == 'waiter'|| data == 'manager'){
           const response=await Person.find({work:data})
           console.log("fetched workType successfully");
           res.status(201).json(response)
        }
        else{
            res.status(404).json({error:"invalid field "})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})

// for updating the current records in the DB
router.put('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
        const updatePersonDetails=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatePersonDetails,{
            new:true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({error:"Person is not Found in the DB"})
        }
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})


// creating the delete routes  
router.delete('/:id',async(req,res)=>{
  try {
    const personId=req.params.id
    const response=await Person.findByIdAndDelete(personId)
    if(!response){
        res.status(404).json({error:"person is not Found"})
    }
    res.status(201).json({message:"data deleted Successfully"})

  } catch (error) {
      console.log(error)
      res.status(500).json({error:"internal server error"})
  }
})

module.exports=router;



