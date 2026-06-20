import SellerOrders from "@/components/dashboard/seller/SellerOrders";
import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { FadeUp } from "@/components/shared/AnimatedDiv";
import EmptyOrders from "@/components/dashboard/EmptyOrders";

export default async function SellerOrdersPage() {
  const user=await getUserSession();
 const res=await protectedFetch(`/api/seller?id=${user.id}`);
 const orders=await protectedFetch(`/api/seller-orders?sellerId=${user.id}`)

  return (
    <FadeUp>
      <SellerOrders res={res} orders={orders} />
    </FadeUp>
  );
}
