import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { Heading1 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SearchProducts() {

    const { searchResults } = useSelector((state) => state.searchSlice);
    const{ productDetails}=useSelector(state=>state.shoppingProducts);
    const { user } = useSelector((state) => state.auth);
    const [keyword,setKeyword]=useState('');
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const{toast}=useToast();
    const dispatch=useDispatch();
    //console.log(keyword);
    useEffect(()=>{
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
        

    dispatch(getSearchResults(keyword))

    

                
            
        }else(
            dispatch(resetSearchResults())
        )
    },[keyword])

function handleAddToCart(getId){
  dispatch(
    addToCart({
      userId: user?.id,
      productId: getId,
      quantity: 1,
    })
  ).then(data=>
  {  if(data?.payload?.success){
    
    dispatch(fetchCartItems(user?.id));
   // console.log(cartItems.items.productId);
    toast({
      title: "Product is added to cart",
    });
     
  }

  }
    
    );
   
}


function handleGetProductDetails(getProductId){
  console.log(getProductId);
      dispatch(fetchProductDetails(getProductId));
     
}

useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
    console.log(searchResults);
    return ( 
  <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
    
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) :  <h1 className="font-bold text-xl mb-6 gap-1">Search Results ({searchResults.length})</h1>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
       
        {searchResults.map((item) => (
          <ShoppingProductTile
            product={item}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />


        ))}
      </div>
      <ProductDetailsDialog productDetails={productDetails}  open={openDetailsDialog}
setOpen={setOpenDetailsDialog}   />
      </div>

    );
}

export default SearchProducts;