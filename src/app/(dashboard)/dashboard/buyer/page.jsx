import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Heart, ShoppingBag } from "lucide-react";

const stats = {
  totalOrders: 12,
  wishlistCount: 8,
};

const recentPurchases = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: "$280",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: "$75",
  },
  {
    id: 3,
    name: "Office Chair",
    price: "$140",
  },
];

export default function BuyerDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Orders</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">{stats.totalOrders}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Orders placed so far
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Wishlist</CardTitle>
            <Heart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">{stats.wishlistCount}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Saved products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Purchases</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <h2 className="text-4xl font-bold">
              {recentPurchases.length}
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Latest bought items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {recentPurchases.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-4 last:border-none"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Product ID #{product.id}
                  </p>
                </div>

                <span className="font-semibold">{product.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}