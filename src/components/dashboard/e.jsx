import { CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyPayments() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">

      <CreditCard className="w-12 h-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">
        No Payment History
      </h2>

      <p className="text-muted-foreground max-w-md">
        You haven’t made any transactions yet. Once you complete a purchase, your payment history will appear here.
      </p>

      <Button asChild className="rounded-full">
        <Link href="/products">
          Start Shopping
        </Link>
      </Button>

    </div>
  );
}