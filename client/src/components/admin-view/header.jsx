import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function AdminHeader({setOpen}) {
 const dispatch=useDispatch();
 const{toast}=useToast();

  function handleLoug(){
  dispatch(logoutUser())
  toast({
    title: "Logged out successfully",
    variant: "destructive",
  });
    }
 
  
    return (
        <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block' >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex-1 flex justify-end">
       <Button className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow' onClick={handleLoug}>
        <LogOut/>
        Logout
       </Button>
      </div>
        </header>
      );
}

export default AdminHeader;