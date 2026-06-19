import EmptyOrders from "@/components/dashboard/EmptyOrders";
import OrdersClient from "@/components/dashboard/OrdersClient";
import { getUserSession } from "@/lib/core/session";
import { serverFetch } from "@/lib/core/server";


export default async function OrdersPage() {
  const user = await getUserSession();

  const orders = await serverFetch(`/api/orders?userId=${user.id}`);
  

  if (!orders || orders.length === 0) {
    return <EmptyOrders />;
  }

  return <OrdersClient orders={orders} />;
}