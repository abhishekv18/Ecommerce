import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import axios from "axios";
import { Button } from "../ui/button";
import { FileIcon, SmileIcon, XIcon } from "lucide-react";
import baseURL from "@/lib/base";
function AuthImageUpload({imageFile,setImageFile,uploadedImageUrl, setUploadedImageUrl }) {
    const inputRef=useRef(null);
   function handleImageFileChange(event){
      const selectedFile=event.target.files?.[0];
      console.log(selectedFile)
      if(selectedFile){
           setImageFile(selectedFile);
      }
 }

 const uploadImageToClodinary=async()=>{
  // setImageLoadingState(true);
     const data=new FormData();
    data.append('file',imageFile)
    const response = await axios.post(
       `${baseURL}/auth/image`,
       data
     );
     console.log(response, "response");
 
     if (response?.data?.success) {
       setUploadedImageUrl(response.data.result.url);
      // setImageLoadingState(false);
     }
}
function handleRemoveImage(){
   setImageFile(null);
   if(inputRef){
       inputRef.current.value="";
   }
 }
  useEffect(()=>{
  if(imageFile){
   uploadImageToClodinary();
   }
 },[imageFile])
             
    return ( 
        
      <div className="w-full max-w-md mx-auto mt-4 ">
          <input type="file" id="image-upload" onChange={handleImageFileChange} className='hidden' ref={inputRef} />
         <div className=" border-2 border-dashed rounded-md p-4" onClick={()=>inputRef.current.click()}>
        
         {
            !imageFile ?  (<Label className='text-lg font-semibold mb-2 block text-center'>Upload Profile Photo</Label>): (
               <div className="flex mx-auto justify-center gap-1 items-center">
            <div className="flex items-center">
            <SmileIcon className="w-8 text-primary mr-2 h-8"/>
         </div>
         <img src={uploadedImageUrl} className="h-28 rounded-full"/>
       
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

export default AuthImageUpload;