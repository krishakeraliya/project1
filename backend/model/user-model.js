const mongoose = require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

})

userschema.pre('save', async function(next){
 const user=this;
if (!user.isModified('password')) {
  return next(); // ✅ Fix
}


   try {
    const saltRound=await bcrypt.genSalt(10)
    const hash_password=await bcrypt.hash(user.password,saltRound )
    user.password=hash_password
   } catch (error) {
     next(error)
   }
})
//compare password

userschema.methods.comparePassword=async function(password){
  try {
    return bcrypt.compare(password,this.password); 
  } catch (error) {
    console.error(error)
  }
}
//json web token
userschema.methods.generateToken=async function(){

  try {
     return jwt.sign({
      userId:this._id.toString(),
      email:this.email,
      isAdmin:this.isAdmin,
     },

     process.env.JWT_SECRET_KEY,{
      expiresIn:"30d"
     }
    )
  } catch (error) {
    console.error(error)
  }

}

//define the model or collection name   model no first letter capital rakhvo..

const User = new mongoose.model("User", userschema)
module.exports = User
