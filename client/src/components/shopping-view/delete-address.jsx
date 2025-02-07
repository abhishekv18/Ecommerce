import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";


import { useToast } from "@/hooks/use-toast";
import { deleteAddress, fetchAllAddress } from "@/store/shop/address-slice";

function DeleteAddressDetails({addressId,setOpen}) {
    const { user } = useSelector((state) => state.auth);
    const{toast}=useToast();
const dispatch=useDispatch();

   function handleDelete(addressId){
       console.log(addressId);
          dispatch(deleteAddress(addressId)).then(data=>{
           console.log(data);
           if(data?.payload?.success){
               dispatch(fetchAllAddress(user?.id));
               toast({
                 title:data?.payload?.message,
                 variant: "destructive",
             })
           }
         });
   }
function help(){
  setOpen(false)
}
           
    return ( 

       
           
            <DialogContent className='p-8 sm:max-w-[450px] '>
                <DialogHeader >
                    <div className='text-center font-semibold text-lg'>
                    Are you sure you want to delete this address ?
                    </div>
                   
                </DialogHeader>
                <div className="flex justify-between mx-auto gap-6">
                <Button onClick={()=>handleDelete(addressId)}>Yes</Button>
                <Button onClick={help}>No</Button>
                </div>
               
            </DialogContent>
          
     );
}

export default DeleteAddressDetails;