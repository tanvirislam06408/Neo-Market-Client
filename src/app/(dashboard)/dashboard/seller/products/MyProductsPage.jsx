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
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProductDialog from "@/components/dashboard/seller/EditProductDialog";

export default function MyProductsPage({ productData:products }) {
  
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

        <Button className="rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search + Filter */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search products..."
                className="rounded-xl pl-10"
              />
            </div>

            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="rounded-3xl">
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

                      <Button
                        size="icon"
                        variant="destructive"
                        className="rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
    </div>
  );
}
