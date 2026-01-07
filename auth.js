const passport=require('passport')
const passportLocal=require('passport-local').Strategy;
const Person=require('./models/Person')

passport.use(
    new passportLocal(async (email, password, done) => {
      try {
          console.log('receiving the data',email ,password)
        const user = await Person.findOne({email:email});
      console.log(user)
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
  
        // ⚠️ Plain text comparison (ONLY for learning)
       const isPasswordMatch= await user.comparePassword(password)
       if(isPasswordMatch){
        return done(null, user)
       }
       else{
        return done(null,false,{message:'password is not correct'})
       }

      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports=passport
