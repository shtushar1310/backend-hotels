const express=require('express')
const Person = require('../models/Person')

const router=express.Router()


//creating the person
router.post('/',async(req,res)=>{
    try {
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save() 
        console.log('data saved')
        res.status(200).json({response})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }

})

// to get all the details 
router.get('/',async(req,res)=>{
    try {
        const data=await Person.find()
        console.log('data fetched successfully')
        res.status(200).json(data)  
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
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



