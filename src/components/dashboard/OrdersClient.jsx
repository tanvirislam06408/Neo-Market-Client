"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  X,
  ShoppingBag,
  Receipt,
  User,
  Store,
  CreditCard,
  Clock,
  Hash,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cancelOrder } from "@/lib/actions/deleteOrder";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


function PaymentBadge({ status }) {
  return (
    <Badge className="bg-green-600 hover:bg-green-600 capitalize">{status}</Badge>
  );
}

function OrderBadge({ status }) {
  const map = {
    delivered: "bg-blue-600 hover:bg-blue-600",
    processing: "bg-amber-500 hover:bg-amber-500",
    cancelled: "bg-red-500 hover:bg-red-500",
  };
  return (
    <Badge className={`capitalize ${map[status] ?? "bg-gray-500"}`}>
      {status}
    </Badge>
  );
}

function DetailRow({ icon: Icon, label, value, mono, accent }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-dashed border-gray-100 last:border-0">
      <div
        className="mt-0.5 p-1.5 rounded-lg shrink-0"
        style={{ background: "rgba(62,95,71,0.08)" }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: "#3E5F47" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm break-all ${mono ? "font-mono text-xs" : "font-medium"} ${accent ? "font-bold" : "text-gray-800"
            }`}
          style={accent ? { color: "#3E5F47" } : {}}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function OrderDetailModal({ order, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const paymentDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <style>{`
        @keyframes modalIn  { from{opacity:0;transform:scale(.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes backdropIn { from{opacity:0} to{opacity:1} }
        .order-modal-backdrop { animation: backdropIn .2s ease both; }
        .order-modal-card    { animation: modalIn .35s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* Backdrop */}
      <div
        className="order-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: "rgba(0,0,0,0.50)",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Card */}
        <div
          className="order-modal-card relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
          style={{
            background: "linear-gradient(160deg,#fff 0%,#f5f8f5 100%)",
            border: "1px solid rgba(62,95,71,0.13)",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 transition-all shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* ── Header ── */}
          <div
            className="px-6 pt-6 pb-5"
            style={{
              background: "linear-gradient(135deg,#3E5F47 0%,#2c4534 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">
                  Order Details
                </h2>
                <p className="text-white/65 text-xs mt-0.5">
                  Order #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Status pills */}
            <div className="flex gap-2 mt-4">
              <span className="text-[10px] px-3 py-1 rounded-full bg-white/15 text-white font-semibold capitalize">
                Payment: {order.paymentStatus}
              </span>
              <span className="text-[10px] px-3 py-1 rounded-full bg-white/15 text-white font-semibold capitalize">
                Order: {order.orderStatus}
              </span>
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="px-6 pt-5 pb-2">
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "#3E5F47" }}
            >
              Product Information
            </p>
            <DetailRow icon={ShoppingBag} label="Product Name" value={order.productName} />
            <DetailRow
              icon={CreditCard}
              label="Price"
              value={`৳${order.price.toLocaleString()}`}
              accent
            />
            <DetailRow
              icon={Hash}
              label="Product ID"
              value={order.productId}
              mono
            />
          </div>

          {/* ── Payment Info ── */}
          <div
            className="mx-6 mt-2 mb-2 rounded-2xl px-4 py-1"
            style={{
              background: "rgba(62,95,71,0.05)",
              border: "1px solid rgba(62,95,71,0.1)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mt-3 mb-1"
              style={{ color: "#3E5F47" }}
            >
              Payment Details
            </p>
            <DetailRow
              icon={Receipt}
              label="Transaction ID"
              value={order.transactionId}
              mono
            />
            <DetailRow icon={Clock} label="Payment Date" value={paymentDate} />
            <DetailRow
              icon={CheckCircle2}
              label="Payment Status"
              value={order.paymentStatus.toUpperCase()}
              accent
            />
          </div>

          {/* ── Buyer Info ── */}
          <div className="px-6 pt-3 pb-2">
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "#3E5F47" }}
            >
              Buyer Information
            </p>
            <DetailRow icon={User} label="Buyer Name" value={order.buyerInfo.userName} />
            <DetailRow
              icon={Receipt}
              label="Email"
              value={order.buyerInfo.customerEmail}
              mono
            />
          </div>

          {/* ── Seller Info ── */}
          <div
            className="mx-6 mt-2 mb-4 rounded-2xl px-4 py-1"
            style={{
              background: "rgba(62,95,71,0.05)",
              border: "1px solid rgba(62,95,71,0.1)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mt-3 mb-1"
              style={{ color: "#3E5F47" }}
            >
              Seller Information
            </p>
            <DetailRow icon={Store} label="Seller Name" value={order.sellerInfo.name} />
            <DetailRow
              icon={Receipt}
              label="Seller Email"
              value={order.sellerInfo.email}
              mono
            />
            <DetailRow
              icon={CreditCard}
              label="Phone"
              value={order.sellerInfo.phone}
            />
          </div>

          {/* ── Close button ── */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full text-sm font-semibold text-white active:scale-95 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg,#3E5F47 0%,#2c4534 100%)",
                boxShadow: "0 4px 16px rgba(62,95,71,0.3)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OrdersClient({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

const handleCancelOrder=async(id)=>{
  try {
    setIsCancelling(true);
    await cancelOrder(id);
    toast.success("Order cancelled successfully");
  } catch (err) {
    toast.error(err);
  } finally {
    setIsCancelling(false);
  }
}

  return (
    <>
      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl" style={{ background: "rgba(62,95,71,0.1)" }}>
            <ShoppingBag className="w-5 h-5" style={{ color: "#3E5F47" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Track and manage your orders.
            </p>
          </div>
        </div>

        {/* ── Desktop Table ── */}
        <div className="hidden md:block rounded-xl border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-xs text-gray-500">
                    #{order._id.slice(-8).toUpperCase()}
                  </TableCell>

                  <TableCell className="font-medium max-w-[140px] truncate">
                    {order.productName}
                  </TableCell>

                  <TableCell className="text-sm text-gray-600">
                    {order.sellerInfo.name}
                  </TableCell>

                  <TableCell className="font-semibold" style={{ color: "#3E5F47" }}>
                    ৳{order.price.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <PaymentBadge status={order.paymentStatus} />
                  </TableCell>

                  <TableCell>
                    <OrderBadge status={order.orderStatus} />
                  </TableCell>

                  <TableCell className="text-center">
                   <div className="flex items-center justify-center gap-3.5">
                     <Button
                      size="sm"
                      className="rounded-full text-xs"
                      style={{
                        background: "linear-gradient(135deg,#3E5F47 0%,#2c4534 100%)",
                        color: "#fff",
                        border: "none",
                      }}
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full text-xs px-4"
                        >
                         Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="mx-auto sm:mx-0 p-2.5 rounded-full bg-red-50 w-fit">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          </div>
                          <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel{" "}
                            <span className="font-medium text-foreground">
                              {order.productName}
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Order</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isCancelling}
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                   </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="rounded-xl border bg-white shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg shrink-0" style={{ background: "rgba(62,95,71,0.08)" }}>
                    <ShoppingBag className="w-3.5 h-3.5" style={{ color: "#3E5F47" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{order.productName}</p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-sm shrink-0" style={{ color: "#3E5F47" }}>
                  ৳{order.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{order.sellerInfo.name}</span>
                <span className="text-gray-300">|</span>
                <PaymentBadge status={order.paymentStatus} />
                <OrderBadge status={order.orderStatus} />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  className="flex-1 rounded-full text-xs"
                  style={{
                    background: "linear-gradient(135deg,#3E5F47 0%,#2c4534 100%)",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="rounded-full text-xs px-4">
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="mx-auto sm:mx-0 p-2.5 rounded-full bg-red-50 w-fit">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel{" "}
                        <span className="font-medium text-foreground">{order.productName}</span>
                        ? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Order</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isCancelling}
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
