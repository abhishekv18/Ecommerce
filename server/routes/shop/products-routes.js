








const express=require('express')
//const { handleImageUpload }=require ( "../controllers/admin/products-controller");
//const { upload } =require( '../../helpers/cloudinary');
const {getFilteredProducts,getProductDetails}= require( '../../controllers/shop/products-controller');
const router=express.Router();

router.get("/get",getFilteredProducts);
router.get("/get/:id",getProductDetails);

module.exports = router;