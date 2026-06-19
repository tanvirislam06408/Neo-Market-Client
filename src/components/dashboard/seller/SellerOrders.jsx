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

export default function SellerOrders({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleStatusUpdate = (id, newStatus) => {
    console.log(id, newStatus);
    // backend later
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
              {orders.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {orders.filter(o => o.status === "Pending").length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {orders.filter(o => o.status === "Processing").length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivered</CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              {orders.filter(o => o.status === "Delivered").length}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Table */}
      <Card>
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

                  <TableCell>
                    {order.productName}
                  </TableCell>

                  <TableCell>
                    {order.buyer}
                  </TableCell>

                  <TableCell>
                    ৳{order.price.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="space-x-2">

                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-[#3E5F47]/30 bg-[#ECEAE5] text-[#3E5F47] hover:bg-[#dfddd8] hover:text-[#304B38] transition-all duration-200"
                      onClick={() => handleView(order)}
                    >
                      View
                    </Button>

                    {order.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          className="rounded-full bg-[#3E5F47] hover:bg-[#304B38] text-white transition-all duration-200"
                          onClick={() =>
                            handleStatusUpdate(order._id, "Accepted")
                          }
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full"
                        >
                          Reject
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
                <p>{selectedOrder.buyer}</p>
              </div>

              <div>
                <p className="font-semibold">Buyer Email</p>
                <p>{selectedOrder.email}</p>
              </div>

              <div>
                <p className="font-semibold">Price</p>
                <p>৳{selectedOrder.price.toLocaleString()}</p>
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <Badge>{selectedOrder.status}</Badge>
              </div>

              <div>
                <p className="font-semibold">Date</p>
                <p>{selectedOrder.date}</p>
              </div>

            </div>
          )}

        </DialogContent>
      </Dialog>

    </div>
  );
}