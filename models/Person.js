const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const PersonSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
         },
    age:{
        type:Number

         },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
        },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

PersonSchema.pre('save',async function(){
    const person=this
    if(!this.isModified('password')) return 
        try {
           const salt =await bcrypt.genSalt(10) 
           const hashedPassword=await bcrypt.hash(person.password,salt)
           person.password=hashedPassword
          
        } catch (error) {
          return  next(error) 
        }
})

PersonSchema.methods.comparePassword=async function(candidatePassword){
    try {
        const isMatch= await bcrypt.compare(candidatePassword,this.password)
        return isMatch
        
    } catch (error) {
           throw error
    }
}

const Person=mongoose.model('Person',PersonSchema)

module.exports=Person;