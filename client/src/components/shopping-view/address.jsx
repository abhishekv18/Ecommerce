import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddress, updateAddress } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

function Address({setCurrentSelectedAddress,selectedId}) {
    const dispatch=useDispatch();
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { addressList } = useSelector((state) => state.address);
    const initialFormData = {
        address: "",
        city: "",
        phone: "",
        pincode: "",
        notes: "",
      };
      const[formData,setFormData]=useState(initialFormData)
function onSubmit(event){// default action hai ki relod kare to usko prevent krta hai
  event.preventDefault();

  if (addressList.length >=4 && currentEditedId === null) {
    setFormData(initialFormData);
    toast({
      title: "You can add max 4 addresses",
      variant: "destructive",
    });

    return;
  }

    currentEditedId!==null? dispatch(updateAddress({
        addressId:currentEditedId,formData
    })).then(data=>{
        console.log(data);
        if(data?.payload?.success){
            dispatch(fetchAllAddress(user?.id))
            setCurrentEditedId(null)
            setFormData(initialFormData);
            toast({
              title:data?.payload?.message,

          })
        }
      }):


  dispatch(addNewAddress({
    ...formData,
    userId:user?.id
  })).then(data=>{
    console.log(data);
    if(data?.payload?.success){
        dispatch(fetchAllAddress(user?.id))
        setFormData(initialFormData);
        toast({
          title:data?.payload?.message,

      })
    }
  })
}
useEffect(()=>{
    dispatch(fetchAllAddress(user?.id))
},[dispatch])


function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }
//function handleDeleteAddress(addressId){
 //   console.log(addressId);
 //      dispatch(deleteAddress(addressId)).then(data=>{
  //      console.log(data);
  //      if(data?.payload?.success){
  //          dispatch(fetchAllAddress(user?.id));
  //          toast({
  //            title:data?.payload?.message,
  //            variant: "destructive",
  //        })
  //      }
  //    });
//}

function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
console.log(addressList);
    return ( <Card  >
        {
           addressList && addressList.length>0  &&    <div className="font-bold text-lg ml-4 mt-2">Address List  </div>
        }
       
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
            
            {
                addressList && addressList.length>0?
                addressList.map(addressItem=><AddressCard addressInfo={addressItem}  handleEditAddress={handleEditAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={selectedId}/>):null
            }
        </div>
        <CardHeader>
            <CardTitle>  {currentEditedId !== null ? "Edit Address" : "Add New Address"}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <CommonForm 
            
             formControls={addressFormControls}
             buttonText={currentEditedId !== null ? "Edit" : "Add"}
                      formData={formData}
                      setFormData={setFormData}
              onSubmit={onSubmit}
            isBtnDisabled={!isFormValid()}
            />
        </CardContent>
    </Card> );
}

export default Address;