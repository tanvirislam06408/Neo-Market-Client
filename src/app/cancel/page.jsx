import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";

const PaymentCancel = async () => {
    const user = await getUserSession()
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">

            {/* Icon */}
            <XCircle className="w-16 h-16 text-red-500" />

            {/* Title */}
            <h1 className="mt-4 text-2xl font-bold">
                Payment Cancelled
            </h1>

            {/* Message */}
            <p className="mt-2 text-muted-foreground max-w-md">
                Your payment was cancelled. No money was charged.
                You can continue shopping anytime.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

                <Button asChild>
                    <Link href="/products">
                        Back to Products
                    </Link>
                </Button>

                <Button variant="outline" asChild>
                    <Link href={`/dashboard/${user?.role}`}>
                        Go to Dashboard
                    </Link>
                </Button>

            </div>

        </div>
    );
};

export default PaymentCancel;