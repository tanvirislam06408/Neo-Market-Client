import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const wishlistItems = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: "$280",
    condition: "Like New",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: "$85",
    condition: "Used",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    name: "Office Chair",
    price: "$140",
    condition: "Refurbished",
    image: "https://picsum.photos/400/300?random=3",
  },
];

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <p className="text-muted-foreground mt-2">
          Products you've saved for later.
        </p>
      </div>

      {/* Products */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-56">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="space-y-4 p-5">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>

                <p className="mt-1 text-muted-foreground">
                  Condition: {item.condition}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {item.price}
                </p>
              </div>

              <div className="flex gap-3">
                <Button asChild className="flex-1">
                  <Link href={`/products/${item.id}`}>
                    View Details
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State Example */}
      {wishlistItems.length === 0 && (
        <div className="flex flex-col items-center py-20">
          <Heart className="h-14 w-14 text-muted-foreground" />

          <h2 className="mt-4 text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-muted-foreground">
            Save products to purchase later.
          </p>

          <Button className="mt-6" asChild>
            <Link href="/products">
              Browse Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}