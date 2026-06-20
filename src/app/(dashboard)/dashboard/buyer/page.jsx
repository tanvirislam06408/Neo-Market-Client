import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { wishList } from "@/lib/api/wishList";
import { protectedFetch, serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { Package, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

export default async function BuyerDashboardOverview() {
  const user = await getUserSession();
  const orders = await protectedFetch(`/api/orders?userId=${user.id}`);
  const wish_List = await wishList();

  return (
    <div className="space-y-8">
      <FadeUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here&apos;s your activity overview.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StaggerItem>
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white">{orders?.length || 0}</h2>
              <p className="text-sm text-white/70 mt-1">Total Orders</p>
              <p className="text-xs text-white/50 mt-2">Orders placed so far</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #4a7a5a 0%, #3a6248 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white">{wish_List?.length || 0}</h2>
              <p className="text-sm text-white/70 mt-1">Wishlist</p>
              <p className="text-xs text-white/50 mt-2">Saved products</p>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #5a8f6a 0%, #4a7a5a 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/15 rounded-xl backdrop-blur-sm">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white">{orders?.length || 0}</h2>
              <p className="text-sm text-white/70 mt-1">Recent Purchases</p>
              <p className="text-xs text-white/50 mt-2">Latest bought items</p>
            </div>
          </div>
        </StaggerItem>
      </div>
      </StaggerContainer>

      <FadeUp delay={0.1}>
        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: "rgba(62,95,71,0.1)" }}>
                <ShoppingBag className="w-4 h-4" style={{ color: "#3E5F47" }} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Recent Purchases</h3>
                <p className="text-xs text-gray-500 mt-0.5">Your latest ordered items</p>
              </div>
            </div>
            {orders?.length > 0 && (
              <Button asChild variant="outline" size="sm" className="rounded-full text-xs">
                <Link href="/dashboard/buyer/orders">
                  View All
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            )}
          </div>

          <div className="divide-y divide-gray-100">
            {orders?.length > 0 ? (
              orders.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(62,95,71,0.06)" }}>
                      <Package className="w-4 h-4" style={{ color: "#3E5F47" }} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product.productName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">ID: #{product.productId}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm" style={{ color: "#3E5F47" }}>
                    ৳{product.price?.toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 rounded-full mb-3" style={{ background: "rgba(62,95,71,0.08)" }}>
                  <ShoppingBag className="w-6 h-6" style={{ color: "#3E5F47" }} />
                </div>
                <p className="text-sm font-medium text-gray-600">No orders yet</p>
                <p className="text-xs text-gray-400 mt-1">Start shopping to see your purchases here</p>
              </div>
            )}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
