import { HeartOff } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">

      <HeartOff className="w-12 h-12 text-muted-foreground" />

      <h2 className="text-xl font-semibold">
        Your wishlist is empty
      </h2>

      <p className="text-muted-foreground max-w-md">
        Save items you love so you can find them easily later.
      </p>

      <Button asChild className="rounded-full">
        <Link href="/products">
          Browse Products
        </Link>
      </Button>

    </div>
  );
}