
const express=require('express')

const { getAllOrdersOfAllUsers,getOrderDetail,updateOrderStatus }= require( '../../controllers/admin/order-controller');
const router=express.Router();


router.get("/get",getAllOrdersOfAllUsers);
router.get("/details/:orderId",getOrderDetail);
router.put("/update/:orderId",updateOrderStatus);

module.exports = router;