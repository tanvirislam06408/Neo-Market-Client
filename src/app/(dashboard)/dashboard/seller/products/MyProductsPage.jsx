"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Pencil,
  Trash2,
  Package,
  Filter,
  Plus,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProductDialog from "@/components/dashboard/seller/EditProductDialog";
import { deleteProduct } from "@/lib/actions/products";
import toast from "react-hot-toast";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SearchSellerProduct from "@/components/dashboard/seller/Search";
import MobileProductCard from "@/components/dashboard/seller/MobileProductCard";

export default function MyProductsPage({ productData: products }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const handleRemoveProduct = async (id) => {
    const res = await deleteProduct(id);
    if (res.deletedCount > 0) {
      toast.success('Product delete successfully !')
    }
    else {
      toast.error('something wrong !')
    }

  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="mt-2 text-muted-foreground">
            Manage all products created by you.
          </p>
        </div>
        <Link href={'/dashboard/seller/add-product'}>
          <Button className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>

      </div>

      {/* Search + Filter */}
      <SearchSellerProduct/>

      {/* Products */}
      <Card className="rounded-3xl hidden md:block">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product List
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.title}
                        width={55}
                        height={55}
                        className="h-[55px] w-[55px] rounded-xl object-cover"
                      />

                      <div className="space-y-1">
                        <p className="font-medium line-clamp-1">
                          {product.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          ID: #{product._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{product.category}</TableCell>

                  <TableCell>
                    <span className="rounded-md bg-muted px-2 py-1 text-xs">
                      {product.condition}
                    </span>
                  </TableCell>

                  <TableCell className="font-semibold">
                    ৳{product.price.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize
                        ${product.status === "available"
                          ? "bg-green-100 text-green-700"
                          : product.status === "sold"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <EditProductDialog product={product} />

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-full text-xs px-4 py-4"
                          >
                            Delete
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
                                {product.productName}
                              </span>
                              ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Order</AlertDialogCancel>
                            <AlertDialogAction
                              disabled={isCancelling}
                              onClick={() => handleRemoveProduct(product._id)}
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

          {products.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-muted-foreground" />

              <h3 className="text-lg font-semibold">
                No products found
              </h3>

              <p className="mt-2 text-muted-foreground">
                Start by adding your first product.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="md:hidden space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Product List</h3>
        </div>
        {products.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="mt-2 text-muted-foreground">Start by adding your first product.</p>
          </div>
        ) : (
          products.map((product) => (
            <MobileProductCard
              key={product._id}
              product={product}
              onDelete={handleRemoveProduct}
            />
          ))
        )}
      </div>
    </div>
  );
}
