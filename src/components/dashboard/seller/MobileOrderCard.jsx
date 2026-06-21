"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

export default function MobileOrderCard({ order, onView, onStatusUpdate }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg shrink-0" style={{ background: "rgba(62,95,71,0.08)" }}>
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: "#3E5F47" }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{order.productName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{order.buyerInfo.userName}</p>
          </div>
        </div>
        <span className="font-bold text-sm shrink-0" style={{ color: "#3E5F47" }}>
          ৳{order.price.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Badge className="capitalize text-xs">{order.orderStatus}</Badge>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button
          size="sm"
          variant="outline"
          className="flex-1 rounded-full text-xs border-[#3E5F47]/30 bg-[#ECEAE5] text-[#3E5F47]"
          onClick={() => onView(order)}
        >
          View
        </Button>

        {order.orderStatus === "processing" && (
          <>
            <Button
              size="sm"
              className="flex-1 rounded-full text-xs bg-[#3E5F47] hover:bg-[#304B38]"
              onClick={() => onStatusUpdate(order._id, "delivered")}
            >
              Delivered
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="rounded-full text-xs"
              onClick={() => onStatusUpdate(order._id, "cancelled")}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
