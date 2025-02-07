const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product =require( "../../models/Product");
const handleImageUpload=async(req,res)=>{
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    res.json({
      success: true,
      result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}


const addProduct = async (req, res) => {
  
  try {
    const {

      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
     
    } = req.body;

    //console.log(averageReview, "averageReview");

    const newlyCreatedProduct = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
     
    });

   // await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      message:"Product added succesfully",
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
const editProduct=async(req,res)=>{
  try {
    const productId=req.params.id;
    const{
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
     
    }=req.body;
    const updatedData={ image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    };
      const product=await Product.findByIdAndUpdate(productId,updatedData,{ new: true});
      if(!product){
        res.status(500).json({
          success: false,
          message: "Product not found",
        });
      }
        res.status(200).json({
          success: true,
         message:"Product edited successfully",
         data:product,
        });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
}
const deleteProduct=async(req,res)=>{
          try {
            const productId=req.params.id;
            const product=await Product.findByIdAndDelete(productId);
            if(!product){
              res.status(500).json({
                success: false,
                message: "Product not found",
              });
            }
            res.status(200).json({
              success: true,
             message:"Product deleted successfully",
            });
          } catch (e) {
            console.log(e);
            res.status(500).json({
              success: false,
              message: "Error occured",
            });
          }
}

module.exports = {
    handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct,
  };