








const express=require('express')
//const { handleImageUpload }=require ( "../controllers/admin/products-controller");
//const { upload } =require( '../../helpers/cloudinary');
const {addToCart,fetchCartItems,updateCartItemQuantity,deleteCartItem}= require( '../../controllers/shop/cart-controller');
const router=express.Router();
router.post("/add",addToCart);
router.get("/get/:userId",fetchCartItems);

router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);
module.exports = router;