



const Feature =require( "../../models/Feature");



const addFeatureImage = async (req, res) => {
  try {
       const {image}  = req.body;
       if(!image){
        res.status(500).json({
            success: false,
            message: "image not found",
          });
       }
     await Feature.create({image});
     

    res.status(201).json({
        success: true,
        message: "image added successfully",
      
      });


    } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getFeatureImages = async (req, res) => {
 try {
     const images=await Feature.find({});
     res.status(201).json({
        success: true,
       data:images,
      });
 } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
 }
};


const deleteFeatureImages = async (req, res) => {
    try {
        const imageId=req.params.id;
        const image=await Feature.findByIdAndDelete(imageId);
        if(!image){
            res.status(500).json({
                success: false,
                message: "Image not found",
              });
        }
        res.status(201).json({
           success: true,
         });
    } catch (error) {
       console.log(error);
       res.status(500).json({
         success: false,
         message: "Some error occured",
       });
    }
   };

module.exports = { addFeatureImage, getFeatureImages,deleteFeatureImages };