"use client";

import Image from "next/image";
import { Package, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditProductDialog from "./EditProductDialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MobileProductCard({ product, onDelete }) {
  const statusStyles = {
    available: "bg-green-100 text-green-700",
    sold: "bg-red-100 text-red-700",
    default: "bg-yellow-100 text-yellow-700",
  };

  const statusClass = statusStyles[product.status] || statusStyles.default;

  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.title}
          width={55}
          height={55}
          className="h-[55px] w-[55px] rounded-xl object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.title}</p>
          <p className="font-mono text-xs text-gray-400 mt-0.5">ID: #{product._id.slice(-6)}</p>
        </div>
        <span className="font-bold text-sm shrink-0" style={{ color: "#3E5F47" }}>
          ৳{product.price.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span className="rounded-md bg-muted px-2 py-1 text-xs">{product.condition}</span>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClass}`}>
          {product.status}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">{product.category}</p>

      <div className="flex items-center gap-2 pt-1">
        <EditProductDialog product={product} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive" className="rounded-full text-xs px-4 py-4">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="mx-auto sm:mx-0 p-2.5 rounded-full bg-red-50 w-fit">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <AlertDialogTitle>Delete Product?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">{product.title}</span>
                ? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Product</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(product._id)}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
