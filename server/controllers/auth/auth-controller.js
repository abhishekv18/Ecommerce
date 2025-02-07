const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { imageUploadUtil } = require("../../helpers/cloudinary");
//register



const handleImageUpload=async(req,res)=>{
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    res.json({
      success: true,
      result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}
const registerUser = async (req, res) => {
  const { userName, email, password,image} = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
   await User.create({
      userName,
      email,
      password: hashPassword,
      image,
    });
//  await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


const loginUser=async(req,res)=>{
    const{email,password}=req.body;
try {
    const checkUser=await User.findOne({email});
    if(!checkUser){
        return res.json({
            success: false,
            message: "User not exist",
          });
    
    }

    const checkPassword=await bcrypt.compare(password,checkUser.password);
    if(!checkPassword){
        return res.json({
            success: false,
            message: "Invalid password",
          });
    }
         const token=jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName,
            image: checkUser.image,
            
},
'CLIENT_SECRET_KEY',
{expiresIn:'60m'}

)
res.cookie('token',token,{httpOnly: true, secure: false }).json({
    success:true,
    message:`Welcome back ${checkUser.userName}`,
    user:{
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        image: checkUser.image,
    },
});
    
} catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
}
}


const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};


//auth  middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
   
    const decoded =await jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};








module.exports = { registerUser ,loginUser,logoutUser,authMiddleware,handleImageUpload};