const mongoose=require('mongoose');
const ProductReviewSchema=new mongoose.Schema({
userId:{
    type:String,
    required:true,
},
 productId:{
        type:String, 
        required:true,
    },
 userName:{
    type:String,
 },
 reviewMessage:{
    type:String,
 },
 reviewValue:{
    type:Number,
 }
},{timestamps:true});
const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);
module.exports = ProductReview;