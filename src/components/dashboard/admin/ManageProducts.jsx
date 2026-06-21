"use client";

import React, { useState } from "react";
import {
  Search,
  Check,
  X,
  Trash2,
  AlertTriangle,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp } from "@/components/shared/AnimatedDiv";
import { toast } from "react-hot-toast";
import Image from "next/image";
import DashboardPagination from "@/components/shared/DashboardPagination";
import { adminDeleteProduct } from "@/lib/actions/products";
import { updateProductStatus } from "@/lib/actions/users";

export default function ManageProducts({ products }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog and details viewing states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Filters logic
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.sellerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || prod.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  // Action: Reject Product
  const handleReject = async (id, status) => {

    const data = {
      id,
      status
    }
    const res = await updateProductStatus(data);
    if(res.matchedCount > 0){
      setDetailsOpen(false);
      toast.success(`product successfully update to ${status}`)
    }
    

  };

  // Action: Prompt Deletion
  const confirmDelete = (prod) => {
    setProductToDelete(prod);
    setDeleteOpen(true);
  };


  // Action: Open product detail dialog
  const handleViewDetails = (prod) => {
    setSelectedProduct(prod);
    setDetailsOpen(true);
  };



  // delete product
  const handleDeleteProduct = async () => {
    const id = productToDelete?._id
    const res = await adminDeleteProduct(id);
    if (res.deletedCount > 0) {
      toast.success('Delete Product Successfully !')
      setDeleteOpen(false);

      setProductToDelete(null);
    }


  }




  return (
    <div className="space-y-6">
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Moderate Products</h1>
          <p className="mt-1 text-muted-foreground">
            Review listing requests, check reported complaints, and manage the marketplace catalog.
          </p>
        </div>
      </FadeUp>

      {/* Filter and search controls */}
      <FadeUp delay={0.05}>
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search product, seller, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 rounded-full bg-background"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-full border px-3 py-1.5 text-sm bg-background w-full sm:w-auto"
              >
                <option value="all">All listings</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="pending">Pending Approval</option>
                <option value="rejected">Rejected</option>
                <option value="reported">Reported</option>
              </select>
            </div>
          </div>
        </Card>
      </FadeUp>

      {/* Products table */}
      <FadeUp delay={0.1}>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Product Image & Name</TableHead>
                <TableHead>Seller / Shop</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <TableRow key={prod._id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3.5">
                        <Image
                          width={50}
                          height={50}
                          src={prod.images?.[0]}
                          alt={prod.title}
                          className="h-11 w-11 rounded-lg object-cover border"
                        />
                        <div>
                          <div className="font-semibold text-sm flex items-center gap-1.5">
                            {prod.title}
                            {prod.status === "reported" && (
                              <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 gap-1 text-[10px] px-1.5 py-0">
                                <AlertTriangle className="h-3 w-3" />
                                {prod.reports ?? 0} reports
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: #{prod._id?.slice(-6)} · {prod.condition}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium align-middle">
                      {prod.sellerInfo?.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground align-middle">{prod.category}</TableCell>
                    <TableCell className="text-sm font-semibold align-middle">৳{prod.price}</TableCell>
                    <TableCell className="align-middle">
                      {prod.status === "available" && (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none dark:bg-emerald-900/40 dark:text-emerald-300">
                          Available
                        </Badge>
                      )}
                      {prod.status === "sold" && (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none dark:bg-blue-900/40 dark:text-blue-300">
                          Sold
                        </Badge>
                      )}
                      {prod.status === "pending" && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-none dark:bg-purple-900/40 dark:text-purple-300">
                          Pending
                        </Badge>
                      )}
                      {prod.status === "rejected" && (
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 border-none dark:bg-gray-800 dark:text-gray-300">
                          Rejected
                        </Badge>
                      )}
                      {prod.status === "reported" && (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-none dark:bg-red-900/40 dark:text-red-300">
                          Reported
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right align-middle">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          title="View Details"
                          onClick={() => handleViewDetails(prod)}
                        >
                          <Eye className="h-4.5 w-4.5 text-muted-foreground" />
                        </Button>

                        {prod.status !== "available" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/20"
                            title="Approve Listing"
                            onClick={() => handleReject(prod._id, "available")}
                          >
                            <Check className="h-4.5 w-4.5 text-emerald-600" />
                          </Button>
                        )}

                        {prod.status !== "rejected" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/20"
                            title="Reject/Unlist"
                            onClick={() => handleReject(prod._id, "rejected")}
                          >
                            <X className="h-4.5 w-4.5 text-orange-600" />

                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                          title="Delete Listing"
                          onClick={() => confirmDelete(prod)}
                        >
                          <Trash2 className="h-4.5 w-4.5 text-red-500" />

                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found matching filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </FadeUp>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Product Review Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <Image
                  width={50}
                  height={50}
                  src={selectedProduct.images?.[0]}
                  alt={selectedProduct.title}
                  className="h-28 w-28 rounded-lg object-cover border"
                />
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{selectedProduct.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    ID: #{selectedProduct._id?.slice(-6)}
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Price: ৳{selectedProduct.price}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                    <Badge variant="outline">{selectedProduct.condition}</Badge>
                    <Badge variant="secondary">Seller: {selectedProduct.sellerInfo?.name}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    {selectedProduct.sellerInfo?.email} · {selectedProduct.sellerInfo?.phone}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>

              {selectedProduct.status === "reported" && (
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5 dark:bg-red-950/20">
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-400 font-semibold text-sm">
                    <AlertTriangle className="h-4.5 w-4.5" />
                    <span>Report Details ({selectedProduct.reports ?? 0} user reports)</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1.5 leading-relaxed">
                    {selectedProduct.reportReason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  Current Status:
                  <span className="font-semibold uppercase text-foreground">{selectedProduct.status}</span>
                </div>
                <div className="flex gap-2">
                  {selectedProduct.status !== "available" && (
                    <Button
                      size="sm"
                      className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                      onClick={() => handleReject(selectedProduct._id,"available")}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  )}
                  {selectedProduct.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-orange-600 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/20 gap-1"
                      onClick={() => handleReject(selectedProduct._id,"rejected")}
                    >
                      <X className="h-3.5 w-3.5" />

                      Reject
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded-full bg-red-600 hover:bg-red-700 text-white gap-1"
                    onClick={() => confirmDelete(selectedProduct)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Product Listing</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to permanently delete the product{" "}
              <strong className="text-foreground">{productToDelete?.title}</strong>? This listing will
              be completely removed from all marketplace catalogs and search indexes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" className="rounded-full" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleDeleteProduct(selectedProduct?._id)} variant="destructive" className="rounded-full bg-red-600 text-white" >
              Delete Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>




    </div>
  );
}