
const ProductReview = require("../../models/Review");

const getProductsReviewsAdmin=async(req,res)=>{
  try {
   
    const reviews=await ProductReview.find({});
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
  }
}


module.exports={getProductsReviewsAdmin};