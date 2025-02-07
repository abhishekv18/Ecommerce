
const express=require('express')
const { registerUser,loginUser,logoutUser,authMiddleware,handleImageUpload }=require ( "../controllers/auth/auth-controller");
const { upload } =require( '../helpers/cloudinary');

const router=express.Router();
router.post("/image",upload.single("file"),handleImageUpload);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  });
module.exports = router;

