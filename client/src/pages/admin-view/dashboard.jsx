import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch=useDispatch();
    const{toast}=useToast();
    const { featureImageList } = useSelector((state) => state.common);
function handleUpload(event){
    event.preventDefault();
     dispatch(addFeatureImage(uploadedImageUrl)).then(data=>{
        if (data?.payload?.success) {
            dispatch(getFeatureImages());
            setImageFile(null);
            setUploadedImageUrl("");
            toast({
                title:"Image added successfully",
            })
         


          }
     })
}



function handleDelete(id){
      console.log(id);
      dispatch(deleteFeatureImage(id)).then(data=>{
        if (data?.payload?.success) {
            dispatch(getFeatureImages());
          
            toast({
                title:"Image deleted successfully",
                variant:'destructive',
            })
         


          }
      })
}
useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  
  console.log(featureImageList, "featureImageList");
    return ( <div>
        <ProductImageUpload 
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                         setUploadedImageUrl={setUploadedImageUrl}
                         setImageLoadingState={setImageLoadingState}
                         imageLoadingState={imageLoadingState}
                         isCustomStyling = {true}
                         />
                         <Button onClick={handleUpload} className="mt-5 w-full">Upload</Button>
                         <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button onClick={()=>handleDelete(featureImgItem?._id)} className='absolute mt-[-42px] right-0'>Delete</Button>
              </div>
            ))
          : null}
      </div>
    </div> );
}

export default AdminDashboard;