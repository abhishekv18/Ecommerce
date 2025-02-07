import AuthImageUpload from "@/components/auth/auth-image";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState={
    username:'',
    email:'',
    password:''
}



function AuthRegister() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [formData, setFormData] = useState(initialState);
    const diapatch=useDispatch();
    const navigate=useNavigate();
    const{toast}=useToast();
    function onSubmit(event){
         event.preventDefault();
         diapatch(registerUser({ ...formData,
          image:uploadedImageUrl,})).then((data)=>{
            if(data?.payload.success){
                toast({
                    title:data?.payload.message,
                })
                navigate('/auth/login')
            } 
   // console.log(data);
         });

    }
    console.log(formData);
    return ( 
    <div className="mx-auto w-full space-y-6 max-w-md">
        <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
              <p className="mt-2">Already have an account
                <Link to='/auth/login' className="font-medium text-blue-600 ml-2 hover:underline">Login</Link>
              </p>

        </div>
        <AuthImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
         setUploadedImageUrl={setUploadedImageUrl}
      />
        <CommonForm
           formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
    
       
    </div>
     );
}

export default AuthRegister;
