import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import DeleteDetails from "./delete-details";

function AdminProductTile({product,  setOpenCreateProductDialog,setCurrentEditedId,setFormData}) {
    const [open,setOpen]=useState(false);



   // function  handleDetails(productId){
    //    console.log(productId);
    //    if(productId){
    //      setOpen(true);
        
     //    }
    //     else  setOpen(false);
    //  }             
    
 
    return ( 
        <Card className='w-full mx-auto max-w-sm'>
            <div>
                <div className="relative">
                    <img 
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2 mt-2 text-ellipsis">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                 <span className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}>${product?.price}</span>
                 {
                    product?.salePrice>0? <span className="text-lg font-bold">${product?.salePrice}</span>:null
                 }
                
                    </div>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <Button onClick={()=>{
                        setOpenCreateProductDialog(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product);
                    }}>Edit</Button>
                    <Button onClick={()=>setOpen(true)}>Delete</Button>
                </CardFooter>
                <DeleteDetails open={open} setOpen={setOpen} productId={product?._id}/>
            </div>
        </Card>
     );
}

export default AdminProductTile;