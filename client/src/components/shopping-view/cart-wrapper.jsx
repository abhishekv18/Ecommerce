import { current } from "@reduxjs/toolkit";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";


function UserCartWrapper({setOpenCartSheet,cartItems}) {
   const navigate=useNavigate();
    const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;


    return  (<SheetContent className='sm:max-w-md'>
    <SheetHeader className='flex flex-row items-center gap-2'>
        <SheetTitle className='mt-2'>Your Cart</SheetTitle>
        <SheetTitle>({cartItems.length})</SheetTitle>
    </SheetHeader>
   
    <div className="mt-8 space-y-4">
        {
            cartItems && cartItems.length > 0?
            cartItems.map(item=> <UserCartItemsContent cartItem={item}/>):null
        }
       </div> 
       <div className="mt-8 space-y-4">
       <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <span className="font-bold">${totalCartAmount}</span>
    </div>
</div>
   
   {
    cartItems.length===0? <Button  className='w-full mt-5 opacity-60 cursor-not-allowed'>Add Products To Cart</Button>: <Button  onClick={() => {
      navigate("/shop/checkout");
      setOpenCartSheet(false);
    }} className='w-full mt-5'>Checkout</Button>
   }
   
    </SheetContent>
    )  
}

export default UserCartWrapper;