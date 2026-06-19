"use client";

import Image from "next/image";
import { ShoppingCart, Trash2, X, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { deleteItems } from "@/lib/actions/wishlist";

// ─── Helper Row ────────────────────────────────────────────────────────────────
function Row({ label, value, highlight, truncate }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-gray-500 shrink-0">{label}</span>
      <span
        className={`text-sm text-right ${
          highlight ? "font-bold" : "font-medium text-gray-700"
        } ${truncate ? "truncate max-w-[180px]" : ""}`}
        style={highlight ? { color: "#3E5F47" } : {}}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Checkout Confirmation Modal ───────────────────────────────────────────────
function CheckoutModal({ item, onConfirm, onCancel }) {
  const quantity = 1;
  const total = item.price * quantity;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  return (
    <>
      <style>{`
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalCardIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1)   translateY(0px); }
        }
        .checkout-modal-backdrop {
          animation: modalBackdropIn 0.2s ease both;
        }
        .checkout-modal-card {
          animation: modalCardIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="checkout-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: "rgba(0,0,0,0.52)",
        }}
        onClick={(e) => e.target === e.currentTarget && onCancel()}
      >
        {/* Card */}
        <div
          className="checkout-modal-card relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(160deg, #ffffff 0%, #f5f8f5 100%)",
            border: "1px solid rgba(62,95,71,0.14)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-700 transition-all duration-200 shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* ── Header ── */}
          <div
            className="px-6 pt-6 pb-5"
            style={{
              background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">
                  Order Summary
                </h2>
                <p className="text-white/65 text-xs mt-0.5">
                  Review your order before payment
                </p>
              </div>
            </div>
          </div>

          {/* ── Product Preview ── */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
            <div className="relative w-[68px] h-[68px] rounded-2xl overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white">
              <Image
                src={item.images?.[0]}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-800 line-clamp-2 text-sm leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Sold by:{" "}
                <span className="text-gray-600 font-medium">
                  {item.sellerInfo?.name ?? "NeoMarket Seller"}
                </span>
              </p>
            </div>
          </div>

          {/* ── Order Details ── */}
          <div className="px-6 py-4 space-y-3">
            <Row label="Product Name" value={item.title} truncate />
            <Row
              label="Unit Price"
              value={`৳${item.price.toLocaleString()}`}
            />
            <Row label="Quantity" value={quantity} />
            <Row label="Delivery Charge" value="Free" />
            <div className="border-t border-dashed border-gray-200 pt-3 mt-1">
              <Row
                label="Total Amount"
                value={`৳${total.toLocaleString()}`}
                highlight
              />
            </div>
          </div>

          {/* ── Delivery Information ── */}
          <div
            className="mx-6 mb-4 rounded-2xl px-4 py-3 space-y-2"
            style={{
              background: "rgba(62,95,71,0.06)",
              border: "1px solid rgba(62,95,71,0.13)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "#3E5F47" }}
            >
              Delivery Information
            </p>
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#3E5F47]" />
              <span>
                Estimated delivery:{" "}
                <span className="font-medium text-gray-700">
                  2–3 working days
                </span>
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#3E5F47]" />
              <span>
                Secure payment via{" "}
                <span className="font-medium text-gray-700">Stripe</span>
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#3E5F47]" />
              <span>
                Order confirmation sent to your{" "}
                <span className="font-medium text-gray-700">email</span>
              </span>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="px-6 pb-6 flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-full text-white text-sm font-semibold active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
                boxShadow: "0 4px 18px rgba(62,95,71,0.38)",
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Wishlist Component ───────────────────────────────────────────────────
export default function WishlistClient({ wishlist}) {
 
  const [modalItem, setModalItem] = useState(null);
  const formRef = useRef(null);

    const handleRemove = async (id) => {
      try {
        const res=await deleteItems(id)
        
       
      } catch (err) {
        toast.error(err)
      }
    };

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  if (!wishlist.length) {
    return (
      <p className="p-6 text-muted-foreground">No wishlist items found</p>
    );
  }

  return (
    <>
      {/* Hidden Stripe form — submitted programmatically on confirm */}
      {modalItem && (
        <form
          ref={formRef}
          action="/api/checkout_sessions"
          method="POST"
          style={{ display: "none" }}
        >
          <input type="hidden" name="productId" value={modalItem._id} />
        </form>
      )}

      {/* Confirmation modal */}
      {modalItem && (
        <CheckoutModal
          item={modalItem}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {wishlist?.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border bg-white shadow-sm overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-52 w-full">
              <Image
                src={item.images?.[0]}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="font-semibold line-clamp-1">{item.title}</h2>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>

              <p className="text-primary font-bold text-lg">
                ৳{item.price.toLocaleString()}
              </p>

              <p className="text-xs text-muted-foreground">
                Seller: {item.sellerInfo?.name}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-3">
                <Button
                  type="button"
                  size="lg"
                  className="flex-1 w-full rounded-full text-base font-medium"
                  onClick={() => openModal(item)}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Checkout
                </Button>

                <Button
                  onClick={() => handleRemove(item._id)}
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}