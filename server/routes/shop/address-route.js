



const express=require('express')
//const { handleImageUpload }=require ( "../controllers/admin/products-controller");
//const { upload } =require( '../../helpers/cloudinary');
const {addAddress,fetchAllAddress,deleteAddres,editAddress}= require( '../../controllers/shop/address-controller');
const router=express.Router();

router.post("/add",addAddress);
router.get("/get/:userId",fetchAllAddress);
router.delete("/delete/:addressId",deleteAddres);
router.put("/edit/:addressId",editAddress);
module.exports = router;