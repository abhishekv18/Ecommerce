import DeleteDetails from "@/components/admin-view/delete-details";
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/ptoduct-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { fetchAllProducts, addNewProduct, deleteProduct, editProduct } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };
  
function AdminProducts() {
   

 const [formData, setFormData] = useState(initialFormData);
    const[openCreateProductDialog,setOpenCreateProductDialog]=useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch=useDispatch();
    const{toast}=useToast();
    const {productList } = useSelector(
        (state) => state.  adminProducts
      );
    function onSubmit(event){
        event.preventDefault();
        {
            currentEditedId !==null ?
            dispatch(editProduct({
                id:currentEditedId,  
              formData,
                
            })).then((data)=>{
              console.log(data);
              if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProductDialog(false);
                setCurrentEditedId(null);
                toast({
                    title:data?.payload?.message,
    
                })
             }
            }) :
       
        dispatch(addNewProduct({
            ...formData,
            image:uploadedImageUrl,
        })).then((data)=>{
             console.log(data);
             if(data?.payload?.success){
                dispatch(fetchAllProducts())
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateProductDialog(false);
               // setCurrentEditedId(null);
                toast({
                    title:data?.payload?.message,
    
                })
             }
        })
      }}

      
      function isFormValid() {
        return Object.keys(formData)
       //   .filter((currentKey) => currentKey !== "averageReview")
          .map((key) => formData[key] !== "")
          .every((item) => item);
      }

      useEffect(()=>{
        dispatch(fetchAllProducts());
       },[dispatch]);

        console.log(productList,uploadedImageUrl,"pde");

        function handleDelete(productId){
            console.log(productId);
                      dispatch(deleteProduct(productId)).then((data)=>{
                        if(data?.payload?.success){
                            dispatch(fetchAllProducts());
                        }
                      })
       
        }

   //     function  handleDetails(productId){
    //      console.log(productId);
     //     if(productId){
     //       setOpen(true);
          
       //    }
      //  }             
      
    return ( 
        <Fragment>
            <div className="mb-5 w-full flex justify-end ">
                <Button onClick={()=>setOpenCreateProductDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                product={productItem}
             //   handleDelete={handleDelete}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
               // handleDetails={handleDetails}
              />
            ))
          : null}
                <Sheet open={openCreateProductDialog} onOpenChange={()=>{setOpenCreateProductDialog(false)
                   setCurrentEditedId(null)
                    setFormData(initialFormData)
                }}>
                    <SheetContent side='right' className='overflow-auto'>
                        <SheetHeader>
                        <SheetTitle>{currentEditedId !== null?'Edit Product':'Add New Product'}</SheetTitle>
                        </SheetHeader>
                        <ProductImageUpload  
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                         setUploadedImageUrl={setUploadedImageUrl}
                         setImageLoadingState={setImageLoadingState}
                         imageLoadingState={imageLoadingState}
                       
                         />
                      <div className="mt-5">
                         <CommonForm
                         formControls={addProductFormElements}
                         buttonText={currentEditedId !== null?'Edit':'Add'}
                         formData={formData}
                         setFormData={setFormData}
                         onSubmit={onSubmit}
                         isBtnDisabled={!isFormValid()}
                         />
                      </div>
                    </SheetContent>
                    </Sheet> 
                    
            </div>
        </Fragment>
     );
}

export default AdminProducts;