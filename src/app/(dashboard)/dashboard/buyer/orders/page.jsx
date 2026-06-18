import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";

export default async function MyOrdersPage() {
  const user = await getUserSession();

  const orders = await serverFetch(
    `/api/orders?userId=${user.id}`
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="mt-2 text-muted-foreground">
          Track and manage your orders.
        </p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order.productId.slice(0, 12)}...
                </TableCell>

                <TableCell>
                  {order.productName}
                </TableCell>

                <TableCell>
                  {order.sellerInfo.name}
                </TableCell>

                <TableCell>
                  ৳{order.price.toLocaleString()}
                </TableCell>

                <TableCell>
                  <Badge className="bg-green-600 hover:bg-green-600">
                    {order.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      order.orderStatus === "delivered"
                        ? "default"
                        : order.orderStatus === "processing"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.orderStatus}
                  </Badge>
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Button variant="outline">
                    Details
                  </Button>

                  {order.orderStatus === "processing" && (
                    <Button variant="destructive">
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}