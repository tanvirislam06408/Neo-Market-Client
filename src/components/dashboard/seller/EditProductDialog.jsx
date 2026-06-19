"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pencil,
  Tag,
  Gauge,
  DollarSign,
  FileText,
  User,
  Mail,
  Phone,
  Lock,
  Leaf,
} from "lucide-react";
import { updateProduct } from "@/lib/actions/products";
import toast from "react-hot-toast";

const categories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Gaming",
  "Home Appliances",
  "Musical Instruments",
  "Sports",
];

const conditions = ["Like New", "Good", "Fair"];

const statusStyles = {
  available: "bg-[#3E5F47] text-white",
  sold: "bg-zinc-400 text-white",
  pending: "bg-amber-500 text-white",
};

const statusDotColors = {
  available: "bg-emerald-400",
  sold: "bg-zinc-400",
  pending: "bg-amber-400",
};

// Reusable section label matching the NeoMarket uppercase-tracking style
function SectionLabel({ icon: Icon, children }) {
  return (
    <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#3E5F47]">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </Label>
  );
}

export default function EditProductDialog({ product }) {


  const [category, setCategory] = useState(product.category);
  const [condition, setCondition] = useState(product.condition);
  const [status, setStatus] = useState(product.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedProduct = {
      title: formData.get("title"),
      category,
      condition,
      price: Number(formData.get("price")),
      description: formData.get("description"),
      status,
    };

    console.log(updatedProduct);

    const res = await updateProduct(product._id, updatedProduct);
    if (res.result.modifiedCount > 0) {
      toast.success(res.message)
    }
    else{
      toast.error(res.message)
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-[#3E5F47]/30 bg-[#ECEAE5] text-[#3E5F47] hover:bg-[#dfddd8] hover:text-[#304B38] hover:border-[#3E5F47]/50 transition-all duration-200 text-xs font-semibold uppercase tracking-[0.15em]"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl md:p-10 overflow-hidden gap-0 rounded-[28px] border-0 shadow-2xl">
        {/* Top accent bar — earthy green gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#3E5F47] via-[#4d7359] to-[#6a9e7a]" />

        <form onSubmit={handleSubmit}>
          {/* Header */}
          <DialogHeader className="px-7 pt-6 pb-5 border-b border-[#ECEAE5]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECEAE5]">
                <Leaf className="h-5 w-5 text-[#3E5F47]" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground tracking-tight">
                  Edit Product
                </DialogTitle>
                <DialogDescription className="mt-0.5 text-sm text-muted-foreground">
                  Update your listing details below. Images cannot be changed here.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Scrollable body */}
          <div className="max-h-[62vh] overflow-y-auto px-7 py-6 space-y-6 bg-white">
            {/* ── Product Details ── */}
            <div className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <SectionLabel icon={Tag}>Product Title</SectionLabel>
                <Input
                  name="title"
                  defaultValue={product.title}
                  placeholder="e.g. Sony WH-1000XM5 Headphones"
                  className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus-visible:ring-[#3E5F47] focus-visible:border-[#3E5F47] placeholder:text-muted-foreground/60 transition"
                />
              </div>

              {/* Category + Condition */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <SectionLabel icon={Tag}>Category</SectionLabel>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus:ring-[#3E5F47] transition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-[#ECEAE5]">
                      {categories.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="rounded-xl focus:bg-[#ECEAE5] focus:text-[#3E5F47]"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <SectionLabel icon={Gauge}>Condition</SectionLabel>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus:ring-[#3E5F47] transition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-[#ECEAE5]">
                      {conditions.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="rounded-xl focus:bg-[#ECEAE5] focus:text-[#3E5F47]"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price + Status */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <SectionLabel icon={DollarSign}>Price (৳)</SectionLabel>
                  <Input
                    type="number"
                    name="price"
                    defaultValue={product.price}
                    placeholder="0.00"
                    className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus-visible:ring-[#3E5F47] focus-visible:border-[#3E5F47] transition"
                  />
                </div>

                <div className="space-y-2">
                  <SectionLabel icon={Gauge}>Status</SectionLabel>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus:ring-[#3E5F47] transition">
                      <SelectValue>
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${statusDotColors[status]}`}
                          />
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-[#ECEAE5]">
                      <SelectItem
                        value="available"
                        className="rounded-xl focus:bg-[#ECEAE5] focus:text-[#3E5F47]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Available
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="sold"
                        className="rounded-xl focus:bg-[#ECEAE5] focus:text-[#3E5F47]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-zinc-400" />
                          Sold
                        </span>
                      </SelectItem>
                      <SelectItem
                        value="pending"
                        className="rounded-xl focus:bg-[#ECEAE5] focus:text-[#3E5F47]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          Pending
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <SectionLabel icon={FileText}>Description</SectionLabel>
                <Textarea
                  rows={4}
                  name="description"
                  defaultValue={product.description}
                  placeholder="Describe your item — condition details, included accessories, etc."
                  className="rounded-xl border-[#ECEAE5] bg-[#ECEAE5]/40 focus-visible:ring-[#3E5F47] focus-visible:border-[#3E5F47] resize-none placeholder:text-muted-foreground/60 transition"
                />
              </div>
            </div>

            {/* ── Seller Info (read-only) ── */}
            <div className="rounded-[20px] bg-[#ECEAE5]/60 border border-[#ECEAE5] p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3E5F47]">
                <Lock className="h-3 w-3" />
                Seller Information &middot; Read only
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <User className="h-3 w-3" /> Name
                  </Label>
                  <Input
                    name="sellerName"
                    defaultValue={product.sellerInfo.name}
                    disabled
                    className="rounded-xl bg-white/70 border-transparent text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Mail className="h-3 w-3" /> Email
                  </Label>
                  <Input
                    name="sellerEmail"
                    defaultValue={product.sellerInfo.email}
                    disabled
                    className="rounded-xl bg-white/70 border-transparent text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Phone className="h-3 w-3" /> Phone
                  </Label>
                  <Input
                    name="sellerPhone"
                    defaultValue={product.sellerInfo.phone}
                    disabled
                    className="rounded-xl bg-white/70 border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-7 py-5 border-t border-[#ECEAE5] bg-[#ECEAE5]/30 flex gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-full border-[#3E5F47]/20 bg-white text-[#3E5F47] hover:bg-[#ECEAE5] hover:text-[#304B38] transition-all duration-200"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              className="rounded-full bg-[#3E5F47] hover:bg-[#304B38] text-white px-7 transition-all duration-200"
            >
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}