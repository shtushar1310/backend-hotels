const express=require('express')
const Menu =require('../models/Menu')
const router=express.Router()


//for creating the menu
router.post('/',async(req,res)=>{
    try {
       const data=req.body;
       const newMenu= new Menu(data)
       const response=await newMenu.save()
       console.log('data of menu saved successfully');
       res.status(201).json(response)
  
      
    } catch (error) {
       console.log(error)
       res.status(500).json({error:'internal server error'})
    }
  })
  
  
  //for get all the list of the menu

router.get('/' ,async(req,res)=>{
    try {

        const data= await Menu.find()
        console.log("data  fetched successfully ")
        res.status(201).json(data)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
})

//search based on the  taste   'sweet','spicy','sour'

router.get('/:tasteType',async(req,res)=>{
    try {
        const taste=req.params.tasteType
        if(taste==='sweet' || taste === 'spicy' || taste === 'sour'){
            const response=await Menu.find({taste:taste})
            console.log('data fetched successfully')
            res.status(201).json(response)
        }

        else{
            res.status(404).json({error:"taste is not valid"})
        }
    } catch (error) {
        console.log(error) 
        res.status(500).json({error:"internal server error"})
    }
})

router.put('/:id',async(req,res)=>{
    try {
         const menuId=req.params.id
         const data=req.body
         const response=await Menu.findByIdAndUpdate(menuId,data,{
            new:true,
            runValidators:true
         })
         if(!response){
            res.status(404).json({error:'user is not found'})
         }
           res.status(201).json(response)

        
    } catch (error) {
        console.log(error) 
        res.status(500).json({error:"internal server error"})
        
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const menuId=req.params.id
        const response=await Menu.findByIdAndDelete(menuId)
        if(!response){
            res.status(404).json({error:"user not Found"})
        }
         res.status(201).json({message:"menu delete successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})


module.exports=router
