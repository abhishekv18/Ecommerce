import Footer from "@/components/shopping-view/footer";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getFeatureImages } from "@/store/common";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon,path: "/shop/listing" },
  { id: "women", label: "Women", icon: CloudLightning,path: "/shop/listing" },
  { id: "kids", label: "Kids", icon: BabyIcon,path: "/shop/listing" },
  { id: "accessories", label: "Accessories", icon: WatchIcon ,path: "/shop/listing"},
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon ,path: "/shop/listing"},
];
const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt ,path: "/shop/listing"},
  { id: "adidas", label: "Adidas", icon: WashingMachine,path: "/shop/listing" },
  { id: "puma", label: "Puma", icon: ShoppingBasket,path: "/shop/listing" },
  { id: "levi", label: "Levi's", icon: Airplay,path: "/shop/listing" },
  { id: "zara", label: "Zara", icon: Images,path: "/shop/listing" },
  { id: "h&m", label: "H&M", icon: Heater,path: "/shop/listing" },
];








function ShoppingHome() {




  const { user } = useSelector((state) => state.auth);
  const{toast}=useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
 // const{ productList}=useSelector(state=>state.shoppingProducts);
  const{ productList,productDetails}=useSelector(state=>state.shoppingProducts);
  const navigate=useNavigate();
  const slides=[bannerOne,bannerTwo,bannerThree];
const dispatch=useDispatch();
const { featureImageList } = useSelector((state) => state.common);
useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
useEffect(() => {
  if (productDetails !== null) setOpenDetailsDialog(true);
}, [productDetails]);
useEffect(()=>{
   dispatch(fetchAllFilteredProducts({filterParams:{ },sortParams:'price-lowtohigh'}));
},[dispatch])
useEffect(() => {// setinterval is a fxn runs repeaditly
  const timer = setInterval(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
  }, 5000);

 return () => clearInterval(timer);
}, [slides]);


function handleNavigateToListing(getCategory,section){
           sessionStorage.removeItem('filters');
           const currentFilters={
            [section]:[getCategory.id],

           };
           sessionStorage.setItem("filters",JSON.stringify(currentFilters))
           navigate('/shop/listing');
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
    return ( 
    
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
{
  featureImageList && featureImageList.length>0?featureImageList.map((slide,index)=>(
    <img src={slide?.image}  key={index}   className={`${
      index === currentSlide ? "opacity-100" : "opacity-0"
    } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>
   
  )):null
}
<Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
         
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide + 1) %
                featureImageList.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-100">
           <div className="mx-auto container px-4">
     <h2 className="text-3xl font-bold text-center mb-8">shop by category</h2>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
              onClick={() =>
                handleNavigateToListing(categoryItem,'category')
                }
                
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
           </div>
      </section>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      
            {brandsWithIcon.map((brandItem) => (
              <Card
              onClick={() =>
               handleNavigateToListing(brandItem,'brand')
               }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
                
                </Card>
            ))}
            
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-2">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.slice(0,8).map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog productDetails={productDetails}  open={openDetailsDialog}
setOpen={setOpenDetailsDialog}   />
  
 <Footer/>
    </div> 
    
);
}

export default ShoppingHome;