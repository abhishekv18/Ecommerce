const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
       
    },
    description:{
        type:String,
       
    },
    category:{
        type:String,
       
    },

    brand:{
        type:String,
       
    },
    price:{
        type:Number,
       
    },
    salePrice:{
        type:Number,
       
    },
    totalStock:{
        type:Number,
        
    },
    image:{
        type:String,
    },
    averageReview:{
        type:Number,
    },
},
{timestamps:true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;