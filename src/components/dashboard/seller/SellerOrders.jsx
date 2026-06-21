"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "@/lib/actions/orders";
import toast from "react-hot-toast";
import EmptyOrders from "./EmptyOrders";
import MobileOrderCard from "./MobileOrderCard";

export default function SellerOrders({ orders, res }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const { deliveredOrders, pendingOrders, processingOrders, totalOrders, totalProducts, totalRevenue, totalSales } = res;
  const handleView = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    console.log(id, newStatus);
    const res = await updateOrderStatus(id, newStatus)
    if(res.modifiedCount > 0){
      toast(`order status update to ${newStatus}`)
    }
    
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Manage Orders
        </h1>

        <p className="text-muted-foreground mt-2">
          Handle incoming customer orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {totalOrders}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {processingOrders ? processingOrders : "0"}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {pendingOrders ? pendingOrders : "0"}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivered</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {deliveredOrders ? deliveredOrders : "0"}
            </h2>
          </CardContent>
        </Card>

      </div>



      {/* Table */}
      {orders.length === 0 ?(
        <EmptyOrders/>
      ) : (
        <>
        <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Incoming Orders</CardTitle>
        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.productName}</TableCell>

                  <TableCell>
                    {order.buyerInfo.userName}
                  </TableCell>

                  <TableCell>
                    ৳{order.price.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-[#3E5F47]/30 bg-[#ECEAE5] text-[#3E5F47]"
                      onClick={() => handleView(order)}
                    >
                      View
                    </Button>

                    {order.orderStatus === "processing" && (
                      <>
                        <Button
                          size="sm"
                          className="rounded-full bg-[#3E5F47] hover:bg-[#304B38]"
                          onClick={() =>
                            handleStatusUpdate(order._id, "delivered")
                          }
                        >
                          Delivered
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleStatusUpdate(order._id, "cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>

        </CardContent>
      </Card>

      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <MobileOrderCard
            key={order._id}
            order={order}
            onView={handleView}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
      </>
      )}

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>
              Order Details
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">

              <div>
                <p className="font-semibold">Product</p>
                <p>{selectedOrder.productName}</p>
              </div>

              <div>
                <p className="font-semibold">Buyer Name</p>
                <p>{selectedOrder.buyerInfo.userName}</p>
              </div>

              <div>
                <p className="font-semibold">Buyer Email</p>
                <p>{selectedOrder.buyerInfo.customerEmail}</p>
              </div>

              <div>
                <p className="font-semibold">Price</p>
                <p>৳{selectedOrder.price.toLocaleString()}</p>
              </div>

              <div>
                <p className="font-semibold">Payment Status</p>
                <Badge>{selectedOrder.paymentStatus}</Badge>
              </div>

              <div>
                <p className="font-semibold">Order Status</p>
                <Badge>{selectedOrder.orderStatus}</Badge>
              </div>

              <div>
                <p className="font-semibold">Transaction ID</p>
                <p>{selectedOrder.transactionId}</p>
              </div>

              <div>
                <p className="font-semibold">Date</p>
                <p>
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

            </div>
          )}

        </DialogContent>
      </Dialog>

    </div>
  );
}