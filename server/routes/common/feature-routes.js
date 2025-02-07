



const express=require('express')
//const { handleImageUpload }=require ( "../controllers/admin/products-controller");
//const { upload } =require( '../../helpers/cloudinary');
const {getFeatureImages,addFeatureImage,deleteFeatureImages}= require( '../../controllers/common/feature-controller');
const router=express.Router();

router.post("/add",addFeatureImage);
router.get("/get",getFeatureImages);
router.delete("/delete/:id",deleteFeatureImages);
module.exports = router;