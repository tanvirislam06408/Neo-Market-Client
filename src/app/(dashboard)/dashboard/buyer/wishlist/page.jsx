import EmptyWishlist from "@/components/dashboard/Empty";
import WishlistClient from "@/components/dashboard/WishlistClient";
import { wishList } from "@/lib/api/wishList";

export default async function WishlistPage() {
  const wishlistData = await wishList();
  console.log(wishList);
  
  if(wishlistData.length ===0){
    return <EmptyWishlist/>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-6">My Wishlist</h1>

      <WishlistClient wishlist={wishlistData} />
    </div>
  );
}