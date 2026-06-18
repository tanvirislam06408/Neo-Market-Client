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

const orders = [
  {
    id: "#ORD-1001",
    product: "Sony WH-1000XM5",
    amount: "$280",
    date: "2026-06-15",
    status: "Pending",
  },
  {
    id: "#ORD-1002",
    product: "Mechanical Keyboard",
    amount: "$90",
    date: "2026-06-10",
    status: "Accepted",
  },
  {
    id: "#ORD-1003",
    product: "Office Chair",
    amount: "$140",
    date: "2026-06-02",
    status: "Cancelled",
  },
];

export default function MyOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>

        <p className="text-muted-foreground mt-2">
          Track and manage your orders.
        </p>
      </div>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>

                <TableCell>{order.product}</TableCell>

                <TableCell>{order.date}</TableCell>

                <TableCell>{order.amount}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      order.status === "Accepted"
                        ? "default"
                        : order.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="flex justify-end gap-2">
                  <Button variant="outline">
                    Details
                  </Button>

                  {order.status === "Pending" && (
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