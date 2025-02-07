const mongoose=require('mongoose')
const AddressSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
   },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    },
},{timestamps:true});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;