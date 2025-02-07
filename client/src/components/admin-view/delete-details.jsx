import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import AdminProductTile from "./ptoduct-tile";
import { deleteProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";

function DeleteDetails({open ,setOpen,productId}) {

    const{toast}=useToast();
const dispatch=useDispatch();

    function handleDelete(productId){
                console.log(productId);
                          dispatch(deleteProduct(productId)).then((data)=>{
                            if(data?.payload?.success){
                                dispatch(fetchAllProducts());
                                setOpen(false);
                                toast({
            
                                    title: "Product deleted successfully",
                                    variant: "destructive",
                       
                                  })
                            }
                          })
            }


            function Close(){
                setOpen(false);
            }
    return ( 

       
           <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className='p-8 sm:max-w-[450px] '>
                <DialogHeader >
                    <div className='text-center font-semibold text-lg'>
                    Are you sure you want to delete this product ?
                    </div>
                   
                </DialogHeader>
                <div className="flex justify-between mx-auto gap-6">
                <Button onClick={()=>handleDelete(productId)}>Yes</Button>
                <Button onClick={()=>Close()}>No</Button>
                </div>
               
            </DialogContent>
           </Dialog>
     );
}

export default DeleteDetails;