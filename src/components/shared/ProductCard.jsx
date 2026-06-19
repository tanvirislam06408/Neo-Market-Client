'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToWishList } from "@/lib/actions/wishlist";
import ShowToast from "@/components/shared/ShowToast";


export default function ProductCard({ product ,user}) {
  const [toastProps, setToastProps] = useState(null);

  const handleAddWishList = async (data) => {
   
    
    try {
      const insertedData={
        ...data,
        userId: user?.id
      }
      const addInWishList = await addToWishList(insertedData);
      
      

      if (addInWishList?.insertedId) {
        setToastProps({ message: "Added to wishlist", type: "success" });
      } 
      
      if(addInWishList.meg){
        setToastProps({ message: addInWishList.meg  ,type:"error"});
      }
    } catch (err) {
      setToastProps({ message: err?.message || "Failed to add to wishlist", type: "error" });
    }

  }
  return (
    <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {toastProps && <ShowToast {...toastProps} />}
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-medium shadow">
          {product.category}
        </div>

        {/* Wishlist */}
        <button onClick={() => handleAddWishList(product)} className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:bg-rose-50">
          <Heart className="h-5 w-5 text-rose-500" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold">
            {product.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              ৳{product.price.toLocaleString()}
            </p>

            <p className="text-sm text-muted-foreground">
              Condition: {product.condition}
            </p>
          </div>

          <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {product.status}
          </div>
        </div>

        <div className="flex gap-3">
          <form className="w-full" action="/api/checkout_sessions" method="POST">
            <input
              type="hidden"
              name="productId"
              value={product._id}
            />
            <Button type="submit" size="lg" className="flex-1 w-full rounded-full bg-[#3E5F47] hover:bg-[#304B38] text-white text-sm font-medium transition-all duration-200">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
          </form>

          <Button
            onClick={() => handleAddWishList(product)}
            size="icon"
            variant="outline"
            className="rounded-full border-[#3E5F47]/25 bg-[#ECEAE5] hover:bg-[#dfddd8] text-[#3E5F47] transition-all duration-200"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        <Link
          href={`/products/${product._id}`}
          className="block text-center text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}