import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({productDetails,open,setOpen}) {//open={open} onOpenChange={setOpen}
const [reviewMsg, setReviewMsg] = useState("");
const [rating, setRating] = useState(0);
const dispatch=useDispatch();
const{toast}=useToast();
const { user } = useSelector((state) => state.auth);
const { reviews } = useSelector((state) => state.reviewSlice);
function handleAddToCart(getId){
  dispatch(
    addToCart({
      userId: user?.id,
      productId: getId,
      quantity: 1,
    })
  ).then(data=>
  {  if(data?.payload?.success){
    setOpen?setOpen(false):null
    dispatch(fetchCartItems(user?.id));
   // console.log(cartItems.items.productId);
    toast({
      title: 'Review Added Successfully',
    });
     
  }

  }
    
    );
   
}
function handleRatingChange(getRating){
  console.log(getRating);
   setRating(getRating);
}
function handleDialog(){
  setOpen(false);
  dispatch(setProductDetails(null));
}

function handleAddReview(){
  dispatch(addReview({
    productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
  })).then((data)=>{
    if(data?.payload?.success){
      setRating(0);
      setReviewMsg("");
    dispatch(getReviews(productDetails?._id));
    toast({
      title:'Review added successfully!',
    });
    }
   
    
  })
}
useEffect(() => {
  if (productDetails !== null) dispatch(getReviews(productDetails?._id));
}, [productDetails]);


console.log(reviews);
    return ( 
        <Dialog open={open} onOpenChange={handleDialog}>
          <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[80vw] sm:max-w-[70vw] lg:max-w-[60vw] ">
       <div className="relative overflow-hidden rounded-lg ">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={650}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
        <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
            <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
            <StarRatingComponent rating={productDetails?.
averageReview} />
        </div>
        <span className="text-muted-foreground">({productDetails?.
averageReview
})</span>
            </div>
          <div className="mt-5 mb-5">

            {
              productDetails?.totalStock<=0? <Button 
               
                 className='w-full opacity-60 cursor-not-allowed' >Out Of Stock</Button>: <Button onClick={
              
                  ()=>handleAddToCart(productDetails?._id,)
                 
                  } className='w-full' >Add to Cart</Button>
            }
           
          </div>
          <Separator/>
          <div className="max-h-[200px] overflow-auto">
           <h2 className="text-xl font-bold mb-4">Reviews</h2>
           <div className="grid gap-6">
           {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
              </div>
           <div className="mt-10 flex-col flex gap-2">
            <Label>Write a review</Label>
            <div className="flex">
              
          <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange}/>
            </div>
               <Input placeholder='Write a review...' value={reviewMsg} onChange={(event)=>setReviewMsg(event.target.value)}/>
               <Button onClick={handleAddReview} disabled={reviewMsg.trim()===""}>Submit</Button>
           </div>
          </div>
        </div>
        
       </DialogContent>
      
        </Dialog>
     );
}

export default ProductDetailsDialog;