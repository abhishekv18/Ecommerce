

const Address = require("../../models/Address");




const addAddress=async(req,res)=>{
try {
        const{ userId, address, city, pincode, phone, notes}=req.body;
       if(!userId || !address || !city || !pincode || !phone || !notes){
        res.status(500).json({
            success: false,
            message: "Fill all the details!",
          });
       }
       await Address.create({
        userId,
         address,
          city,
           pincode,
            phone,
             notes,
       });
       res.status(200).json({
        success: true,
        message: "Address added successfully",
      });
} catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
}

}

const fetchAllAddress=async(req,res)=>{
    try {
            const {userId} =req.params;
            if(!userId){
              res.status(500).json({
                  success: false,
                  message: "user not found",
                });
             }
        const addressList=   await Address.find({userId});
        if (!addressList) {
            return res.status(404).json({
              success: false,
              message: "Address not found",
            });
          }
           res.status(200).json({
            success: true,
           data:addressList,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error",
        });
    }

}
const fetchAllAddres = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.findById(userId );

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddres = async (req, res) => {
  try {
    const  addressId  = req.params.addressId;
    if ( !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id and password id is required!",
      });
    }

    const address = await Address.findByIdAndDelete(addressId);
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "address not found",
      });
    }
    res.status(200).json({
      success: true,
     message:"Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

          
const editAddress= async (req, res) => {
  try {
    const  addressId  = req.params.addressId;
    const{  address, city, pincode, phone, notes }=req.body;
    if ( !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id and password id is required!",
      });
    }
       const updatedData={
        address,
          city,
           pincode,
            phone,
             notes,
       }
    const editAddress = await Address.findByIdAndUpdate(addressId,updatedData,{ new: true});
    if (!editAddress) {
      return res.status(400).json({
        success: false,
        message: "address not found",
      });
    }
    res.status(200).json({
      success: true,
     message:"Address updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};




module.exports = {
   addAddress,fetchAllAddress,deleteAddres,editAddress
   };



