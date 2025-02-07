import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import OrdersDetailsView from "./order-details";
import { Dialog } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, setOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {

     const[open,setOpen]=useState(false);
     const dispatch=useDispatch();
     const{user}=useSelector(state=>state.auth);

     const{orderList,orderDetails}=useSelector(state=>state.shoppingOrder);

     useEffect(()=>{
      dispatch(getAllOrdersByUserId(user?.id))
     },[dispatch]);
     function handleFetchOrderDetails(getId){
      dispatch(getOrderDetails(getId));
}

     useEffect(()=>{
      if(orderDetails!==null) setOpen(true);
     },[orderDetails]);

     console.log(orderDetails);
    return ( 

   <Card>


   <CardHeader>
    <CardTitle>Order History</CardTitle>
   </CardHeader>
   <CardContent>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead><span className="sr-only">Details</span></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>

          {
            orderList && orderList.length>0?
            orderList.map(orderItem=><TableRow>
              <TableCell className="font-medium">{orderItem?._id}</TableCell>
              <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
              <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
              <TableCell className="font-semibold">${orderItem?.totalAmount}</TableCell>
              <Dialog open={open}  onOpenChange={()=>{
                setOpen(false)
                dispatch(setOrderDetails())
              }}>
              <TableCell className="">
                <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)} >View Details</Button>
                <OrdersDetailsView orderDetails={orderDetails}/>
                </TableCell>
              </Dialog>
                </TableRow>):null
          }
       
        </TableBody>
    </Table>
   </CardContent>
   </Card>
     
    );
}

export default ShoppingOrders;