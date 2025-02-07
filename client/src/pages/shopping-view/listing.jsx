import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/shopping-view/footer";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";


function createSearchParamsHelpers(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}
function ShoppingListing() {
const dispatch=useDispatch();
const{ productList,productDetails}=useSelector(state=>state.shoppingProducts);

const[filters,setFilters]=useState({});
const[sort,setSort]=useState(null);
const[searchParams,setSearchParams]=useSearchParams()
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const { user } = useSelector((state) => state.auth);
const { cartItems } = useSelector((state) => state.shoppingCart);
const{toast}=useToast();
function handleSort(value){//  assa nhi hoga ki fxn pass kia and apne aap value aagaye ji value pass karana padega ohk!
 //console.log(value);
  setSort(value);
 
}

function handleFilter(getSectionId,getCurrentOptions){// if value change so use let else const
  console.log(getSectionId,getCurrentOptions);

  let cpyFilters={...filters};
  const indexOfCurrentSection= Object.keys(cpyFilters).indexOf(getSectionId);
  if(indexOfCurrentSection===-1){
    cpyFilters={
      ...cpyFilters,
      [getSectionId]:[getCurrentOptions],
    };
   // console.log(cpyFilters);
  }else{
      const indexOfCurrentOption=cpyFilters[getSectionId].indexOf(getCurrentOptions);
      if(indexOfCurrentOption===-1)
        cpyFilters[getSectionId].push(getCurrentOptions);
      else
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      
  }
  setFilters(cpyFilters);
  sessionStorage.setItem("filters", JSON.stringify(cpyFilters));

}


function handleGetProductDetails(getProductId){
  console.log(getProductId);
      dispatch(fetchProductDetails(getProductId));
     
}

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



useEffect(()=>{
  setSort("price-lowtohigh");
  setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
},[]);
console.log(filters);


useEffect(() => {
  if (productDetails !== null) setOpenDetailsDialog(true);
}, [productDetails]);


useEffect(()=>{
  if(filters && Object.keys(filters).length>0){
    const CreateQueryString=createSearchParamsHelpers(filters)
    setSearchParams(new URLSearchParams(CreateQueryString))
  }
},[filters])



useEffect(() => {
  if (filters !== null && sort !== null)
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
    );
}, [dispatch, sort, filters]);

 

//console.log(cartItems);


    return ( 
             
        <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-6 p-4 md:p-6 min-h-screen">
            <ProductFilter handleFilter={handleFilter} filters={filters}/>
            <div className="bg-background w-full rounded-lg shadow-sm ">
               <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-extrabold">All Products</h2>
                <div className="flex items-center gap-3">
              <span className="text-muted-foreground ">({productList.length}) products</span>
                
                <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-[200px] ">
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
            {
                sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
            }
        </DropdownMenuRadioGroup>
               </DropdownMenuContent>
              </DropdownMenu>
               </div>
               </div>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
 {
  productList && productList.length>0 ?
  productList.map(productItem=><ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddToCart={handleAddToCart}/>):null
 }






             </div>
             <Footer/>
             </div>
             <ProductDetailsDialog productDetails={productDetails}  open={openDetailsDialog}
setOpen={setOpenDetailsDialog}   />
  
        </div>
       
     );
}//open={openDetailsDialog}
//setOpen={setOpenDetailsDialog}

export default ShoppingListing;