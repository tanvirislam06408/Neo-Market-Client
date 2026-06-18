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

const payments = [
  {
    id: "TXN-1001",
    amount: "$280",
    date: "Jun 17, 2026",
    status: "Completed",
  },
  {
    id: "TXN-1002",
    amount: "$95",
    date: "Jun 15, 2026",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    amount: "$140",
    date: "Jun 10, 2026",
    status: "Failed",
  },
  {
    id: "TXN-1004",
    amount: "$60",
    date: "Jun 07, 2026",
    status: "Completed",
  },
];

export default function PaymentHistoryPage() {
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
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.id}
                  </TableCell>

                  <TableCell>{payment.amount}</TableCell>

                  <TableCell>{payment.date}</TableCell>

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
                      {payment.status}
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