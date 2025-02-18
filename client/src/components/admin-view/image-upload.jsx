import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({imageFile,setImageFile,uploadedImageUrl, setUploadedImageUrl , imageLoadingState,isCustomStyling = false,
    setImageLoadingState,}) {
  const inputRef=useRef(null);
   function handleImageFileChange(event){
        const selectedFile=event.target.files?.[0];
        if(selectedFile){
             setImageFile(selectedFile);
        }
   }
   function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(){
    setImageFile(null);
    if(inputRef){
        inputRef.current.value="";
    }
  }

const uploadImageToClodinary=async()=>{
    setImageLoadingState(true);
      const data=new FormData();
     data.append('my_file',imageFile)
     const response = await axios.post(
        `http://localhost:5000/api/admin/products/upload-image`,
        data
      );
      console.log(response, "response");
  
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
      }
}

  useEffect(()=>{
if(imageFile){
    uploadImageToClodinary();
}
  },[imageFile])
    return ( 
        <div  className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
                  <Label className={`text-lg font-semibold mb-2 block ${isCustomStyling ? "text-center font-bold mb-1 text-xl" : ""}`}>Upload Image</Label>
                  <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                    <input type="file" id="image-upload" className="hidden" onChange={handleImageFileChange} ref={inputRef}/>
                    {
                        !imageFile ?(
                        <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                         <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                         <span>Drag & drop or click to upload image</span>
                        </Label>):
                        imageLoadingState ? (
                          <Skeleton className="h-10 bg-gray-200" />
                        ) : (
                        <div className="flex items-center justify-between">
                             <div className="flex items-center">
                                <FileIcon className="w-8 text-primary mr-2 h-8"/>
                             </div>
                             <p className="text-sm font-md">{imageFile.name}</p>
                             <Button
                             variant="ghost"
                             size="icon"
                             className="text-muted-foreground hover:text-foreground"
                             onClick={handleRemoveImage}>
                             <XIcon className="w-4 h-4" />
                             <span className="sr-only">Remove File</span>
                             </Button>
                        </div>
                        )
                    }
                  </div>
        </div>
     );
}

export default ProductImageUpload;