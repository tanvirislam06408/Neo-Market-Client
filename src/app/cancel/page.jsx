import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";
import { FadeUp } from "@/components/shared/AnimatedDiv";

const PaymentCancel = async () => {
    const user = await getUserSession()
    return (
        <FadeUp>
            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">
                <XCircle className="w-16 h-16 text-red-500" />

                <h1 className="mt-4 text-2xl font-bold">
                    Payment Cancelled
                </h1>

                <p className="mt-2 text-muted-foreground max-w-md">
                    Your payment was cancelled. No money was charged.
                    You can continue shopping anytime.
                </p>

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
        </FadeUp>
    );
};

export default PaymentCancel;
