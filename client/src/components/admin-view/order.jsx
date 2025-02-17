import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrdersDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {


    const[open,setOpen]=useState(false);

    const{orderList,orderDetails}=useSelector(state=>state.adminOrder);
    const dispatch=useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
      }
      useEffect(() => {
        if (orderDetails !== null) setOpen(true);
      }, [orderDetails]);
    useEffect(()=>{
       dispatch(getAllOrdersForAdmin());
    },[dispatch])

    console.log(orderDetails);
    return ( 
  <Card>


   <CardHeader>
    <CardTitle>All Orders</CardTitle>
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
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell className='font-medium'>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
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
                    <TableCell className='font-semibold'>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={open}
                        onOpenChange={() => {
                          setOpen(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrdersDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
    </Table>
   </CardContent>
   </Card>
    );
}

export default AdminOrdersView;