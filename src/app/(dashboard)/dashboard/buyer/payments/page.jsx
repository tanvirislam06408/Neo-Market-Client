import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import EmptyPayments from "@/components/dashboard/e";






export default async function PaymentHistoryPage() {
  const user = await getUserSession();

  const payments = await serverFetch(
    `/api/orders?userId=${user.id}`
  );

      if(!payments || payments.length ===0){
        return <EmptyPayments/>
      }
      console.log(payments);
      
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>

        <p className="mt-2 text-muted-foreground">
          View all your previous transactions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell className="font-medium">
                    {payment.transactionId}
                  </TableCell>

                  <TableCell>{payment.price}</TableCell>

                  <TableCell>{new Date(payment.createdAt).toDateString()}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "Completed"
                          ? "default"
                          : payment.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {payment.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}