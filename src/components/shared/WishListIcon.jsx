import { wishList } from "@/lib/api/wishList";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function WishlistIcon () {
    const wishListCount=await wishList()
    const count=wishListCount.length
  return (
    <Link href={'/dashboard/buyer/wishlist'} className="relative inline-flex">
      
      <Heart className="w-6 h-6" />

      
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
          {count}
        </span>
  

    </Link>
  );
}