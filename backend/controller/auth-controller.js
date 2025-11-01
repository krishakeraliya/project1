const User = require("../model/user-model")
const bcrypt=require("bcryptjs")

const home = async (req, res) => {
  try {
    res.status(200).send(" hello krisha welcome to backend using router again")
  } catch (error) {
    console.log(error)
  }
}
//register logic
const signup = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, phone, password } = req.body

    const userExist = await User.findOne({ email }) // Check duplicate
    if (userExist) {
      return res.status(400).json({ message: "email already exist" })
    }

    //hash password valu logic userschema ma che...

    const usercreated = await User.create({ username, email, phone, password  }) // Save new user
    res.status(201).json({ msg: "registraion Succesfully" , 
      token:await usercreated.generateToken(),
      userId:usercreated._id.toString()})
  } catch (error) {
    console.error("Signup error:", error); 
    res.status(500).json("internal server error")
  }
}

//login logic 

const login=async (req,res)=>{
  try {
    const {email,password}=req.body
    const userExist=await User.findOne({email})
    if(!userExist){
      return res.status(400).json({message:"invalid"})
    }

    // const user=await bcrypt.compare(password,userExist.password);
    const user=await userExist.comparePassword(password);
    if(user){
      res.status(200).json({ msg: "Login Succesful" , token:await userExist.generateToken(),userId:userExist._id.toString()})
    }else{
      res.status(401).json({message:"invalid email or password"})
    }
  } catch (error) {
      // res.status(500).json("internal server error")
      next(error)
  }
}
const user = async (req, res) => {
  try {
    const userdata = req.user;
    console.log(userdata);   // ✅ ab sahi log hoga
    return res.status(200).json({ userdata });
  } catch (error) {
    console.log(error);
  }
};

// controller/roundController.js
// const rounds = {
//   aptitude: [{ q: "2+2=?", options:["3","4"], answer:"4" }],
//   programming: [{ q: "Reverse a string", answer:"..." }],
//   hr: [{ q: "Tell me about yourself", answer:"..." }],
// };

// const getRound = (req, res) => {
//   const { roundName } = req.params;
//   if (rounds[roundName]) {
//     res.json(rounds[roundName]);
//   } else {
//     res.status(404).json({ message: "Round not found" });
//   }
// };


module.exports = { home, signup ,login,user}
