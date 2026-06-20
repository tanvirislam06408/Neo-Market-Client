"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Loader } from "@/components/ui/loader";
import { addProducts } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CATEGORIES = [
  { title: "Electronics" },
  { title: "Fashion" },
  { title: "Furniture" },
  { title: "Gaming" },
  { title: "Home Appliances" },
  { title: "Musical Instruments" },
  { title: "Sports" },
];

const CONDITIONS = ["Good", "Like New"];

const initialForm = {
  title: "",
  category: "",
  condition: "",
  price: "",
  stock: "",
  description: "",
};

export default function AddProductForm() {
  const { data: session, isPending } = authClient.useSession()
  const router=useRouter()

  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  if (isPending) {
    return <Loader text={'loading'} />
  }

  const user = session?.user;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSelectChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setUploadedImageUrl(null);
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadedImageUrl(null);
  };

const uploadToCloudinary = async (file) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    console.log("Cloudinary error:", data);
    throw new Error("Upload failed");
  }
  return data.secure_url;
};

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Product title is required.";
    if (!form.category) newErrors.category = "Please select a category.";
    if (!form.condition) newErrors.condition = "Please select product condition.";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Enter a valid price greater than 0.";
    if (form.stock === "" || Number(form.stock) < 0) newErrors.stock = "Enter a valid stock quantity.";
    if (!imageFile && !uploadedImageUrl) newErrors.image = "Product image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSaving(true);

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile);
      if (!imageUrl) {
        setIsSaving(false);
        return;
      }
    }

    const productData = {
      title: form.title.trim(),
      category: form.category,
      condition: form.condition,
      price: Number(form.price),
      stock: Number(form.stock),
      images: imageUrl ? [imageUrl] : [],
      description: form.description.trim(),
      sellerInfo: {
        userId: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      },
      status: "available",
    };

    const res=await addProducts(productData)
    if(res.insertedId){
      toast.success("Product added successfully !")
      router.push('/dashboard/seller/products')
    }

    setIsSaving(false);
    setForm(initialForm);
    removeImage();
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="w-full max-w-3xl mx-auto rounded-2xl shadow-md border-muted bg-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Add New Product</CardTitle>
          <CardDescription>Fill out the details to list your item in the marketplace.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="font-medium text-sm">Product Image</Label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-36 h-36 rounded-xl overflow-hidden border bg-muted">
                    <Image src={imagePreview} alt="Product preview" fill className="object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 transition-all">
                      <X className="h-3.5 w-3.5" />
                    </button>
                    {isUploading && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                ) : (
                  <label htmlFor="product-image" className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-muted-foreground/20 rounded-xl cursor-pointer text-muted-foreground hover:border-primary/50 hover:text-primary transition-all bg-muted/30">
                    <Upload className="h-5 w-5 mb-1.5 text-muted-foreground/70" />
                    <span className="text-xs font-medium">Upload Image</span>
                    <input id="product-image" type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  </label>
                )}
              </div>
              {errors.image && <p className="text-xs font-medium text-destructive mt-1">{errors.image}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-2"
            >
              <Label htmlFor="title">Product Title</Label>
              <Input id="title" placeholder="e.g., Sony WH-1000XM4 Headphones" value={form.title} onChange={handleChange("title")} className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""} />
              {errors.title && <p className="text-xs font-medium text-destructive">{errors.title}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={handleSelectChange("category")}>
                  <SelectTrigger id="category" className={errors.category ? "border-destructive focus:ring-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.title} value={cat.title}>{cat.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs font-medium text-destructive">{errors.category}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={form.condition} onValueChange={handleSelectChange("condition")}>
                  <SelectTrigger id="condition" className={errors.condition ? "border-destructive focus:ring-destructive" : ""}>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((cond) => (
                      <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.condition && <p className="text-xs font-medium text-destructive">{errors.condition}</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="price">Price (৳)</Label>
                <Input id="price" type="number" min="0" step="1" placeholder="0" value={form.price} onChange={handleChange("price")} className={errors.price ? "border-destructive focus-visible:ring-destructive" : ""} />
                {errors.price && <p className="text-xs font-medium text-destructive">{errors.price}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" type="number" min="0" step="1" placeholder="0" value={form.stock} onChange={handleChange("stock")} className={errors.stock ? "border-destructive focus-visible:ring-destructive" : ""} />
                {errors.stock && <p className="text-xs font-medium text-destructive">{errors.stock}</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a detailed description of the product's features and inclusions..." rows={5} value={form.description} onChange={handleChange("description")} className="resize-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Button type="submit" disabled={isSaving || isUploading} className="w-full h-11 rounded-xl font-medium transition-all">
                {isSaving || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading image..." : "Creating listing..."}
                  </>
                ) : "List Product"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}