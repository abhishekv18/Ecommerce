import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

import DeleteAddressDetails from "./delete-address";
import { Dialog } from "../ui/dialog";

function AddressCard({
  addressInfo,
  setCurrentSelectedAddress,
  handleEditAddress,
  //setCurrentSelectedAddress,
  selectedId,
}){
const [open,setOpen]=useState(false);





 
  return (
    <Card onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(addressInfo):null }  className={`cursor-pointer  ${
      selectedId?._id === addressInfo?._id
        ? "border-red-900 border-[4px]"
        : "border-black"
    }`}>
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Dialog open={open} onOpenChange={setOpen} >
        <Button onClick={()=>setOpen(true)}>Delete</Button>
        <DeleteAddressDetails addressId={addressInfo?._id} setOpen={setOpen}/>
        </Dialog>
       
       
      </CardFooter>
    
    </Card>
  );
}

export default AddressCard;