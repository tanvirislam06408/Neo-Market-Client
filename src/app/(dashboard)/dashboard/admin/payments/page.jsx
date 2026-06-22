import { CreditCard, Receipt, Clock, CheckCircle2, XCircle } from "lucide-react";
import EmptyPayments from "@/components/dashboard/EmptyPayments";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";
import { protectedFetch } from "@/lib/core/server";

function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();
  const isCompleted = s === "completed";
  const isPending = s === "pending" || s === "processing";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        isCompleted
          ? "bg-green-50 text-green-700"
          : isPending
          ? "bg-amber-50 text-amber-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : isPending ? (
        <Clock className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

export default async function PaymentHistoryPage() {
  const payments = await protectedFetch(`/all-payments`);

  if (!payments || payments.length === 0) {
    return <EmptyPayments />;
  }

  return (
    <div className="space-y-6">
      <FadeUp>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl shrink-0" style={{ background: "rgba(62,95,71,0.1)" }}>
            <CreditCard className="w-5 h-5" style={{ color: "#3E5F47" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {payments.length} {payments.length === 1 ? "transaction" : "transactions"} found
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="hidden md:block rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Transaction ID</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Product</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Amount</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Date</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-gray-500">{payment.transactionId}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{payment.productName}</td>
                    <td className="px-5 py-4">
                      <span className="font-semibold" style={{ color: "#3E5F47" }}>
                        ৳{payment.price?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={payment.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>

      <div className="md:hidden space-y-3">
        {payments.map((payment) => (
          <FadeUp key={payment._id}>
            <div className="rounded-xl border bg-white shadow-sm p-1.5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg shrink-0" style={{ background: "rgba(62,95,71,0.08)" }}>
                    <Receipt className="w-3.5 h-3.5" style={{ color: "#3E5F47" }} />
                  </div>
                  <span className="font-mono text-xs text-gray-500 truncate">{payment.transactionId}</span>
                </div>
                <StatusBadge status={payment.paymentStatus} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{payment.productName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </p>
                </div>
                <span className="font-bold text-sm shrink-0" style={{ color: "#3E5F47" }}>
                  ৳{payment.price?.toLocaleString()}
                </span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>



     
    </div>
  );
}
