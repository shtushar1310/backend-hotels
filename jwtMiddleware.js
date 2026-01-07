const jwt =require('jsonwebtoken')

const jwtAuthMiddleware=(req,res,next)=>{
    //extract the jwt token from the header
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'token not found'})

    const token=req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(401).json({error:"unauthorized"})
    }
    try {
        //verify the jwt token 
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        //attach user information to the request object
        req.user=decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Invalid Token"})
        
    }
}

const generateToken=async(userData)=>{
    //generate a new jwt token using the user data 
    return await jwt.sign(userData,process.env.JWT_SECRET)
}
module.exports={jwtAuthMiddleware,generateToken}