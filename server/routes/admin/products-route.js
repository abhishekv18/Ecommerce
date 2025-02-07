
const express=require('express')
//const { handleImageUpload }=require ( "../controllers/admin/products-controller");
const { upload } =require( '../../helpers/cloudinary');
const { handleImageUpload,addProduct,fetchAllProducts,deleteProduct,editProduct }= require( '../../controllers/admin/products-controllers');
const router=express.Router();

router.post("/upload-image",upload.single("my_file"),handleImageUpload);
router.post("/add",addProduct);
router.get("/get",fetchAllProducts);
router.put("/edit/:id",editProduct);
router.delete("/delete/:id",deleteProduct);

module.exports = router;