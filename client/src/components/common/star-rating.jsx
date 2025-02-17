import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({rating,handleRatingChange}) {
    return ( 
        [1,2,3,4,5].map((star)=>(
            <Button variant='outline'  size='icon' className={`p-2 rounded-full transition-colors ${
                star <= rating
                  ? "text-yellow-500 hover:bg-black"
                  : "text-black hover:bg-primary hover:text-primary-foreground"
              }`}  onClick={handleRatingChange?()=>handleRatingChange(star):null}>
                <StarIcon className={`w-6 h-6 ${//()=> kuch pass krna ho to ye use karo
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}  />
            </Button>
        ))
     );
}

export default StarRatingComponent;