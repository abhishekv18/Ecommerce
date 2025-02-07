import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrdersDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { getReviewsAdmin } from "@/store/admin/admin-reviewSlice";


function Reviews() {


    const {  adminReview } = useSelector((state) => state.adminReviewSlice);
  
    const dispatch=useDispatch();

    
   
    useEffect(()=>{
       dispatch(getReviewsAdmin());
    },[dispatch]);

    console.log( adminReview);
    return ( 
  <Card>


   <CardHeader>
    <CardTitle>All Reviews</CardTitle>
   </CardHeader>
   <CardContent>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>User Id</TableHead>
                <TableHead>Product Id</TableHead>
                <TableHead>Review Message</TableHead>
                <TableHead>Review Value</TableHead>
              
            </TableRow>
        </TableHeader>
        <TableBody>
            { adminReview &&  adminReview.length > 0
              ?  adminReview.map((review) => (
                  <TableRow>
                    <TableCell className='font-medium'>{review?.userId}</TableCell>
                    <TableCell className='font-medium'>{review?.productId}</TableCell>
                    <TableCell className='font-medium'>{review?.reviewMessage}</TableCell>
                    <TableCell className='font-medium'>{review?.reviewValue}</TableCell>
                   
                  </TableRow>
                ))
              : null}
          </TableBody>
    </Table>
   </CardContent>
   </Card>
    );
}

export default Reviews;