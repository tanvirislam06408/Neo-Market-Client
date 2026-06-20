

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
// Icon components are resolved inside the client component
// to avoid passing non-plain objects from a Server Component.
import Logo from "../shared/Logo";
import { getUserSession } from "@/lib/core/session";
import { DashboardSidebarNavItems } from "./DashboardSidebarNavItems";



const navItems = {
  buyer: [
    {
      name: "Dashboard",
      path: "/dashboard/buyer",
      icon: "LayoutDashboard",
    },
    {
      name: "My Orders",
      path: "/dashboard/buyer/orders",
      icon: "Package",
    },
    {
      name: "Wishlist",
      path: "/dashboard/buyer/wishlist",
      icon: "Heart",
    },
    {
      name: "Payment History",
      path: "/dashboard/buyer/payments",
      icon: "CreditCard",
    },
    {
      name: "Profile",
      path: "/dashboard/buyer/profile",
      icon: "User",
    },
  ],

  seller: [
    {
      name: "Dashboard",
      path: "/dashboard/seller",
      icon: "LayoutDashboard",
    },
    {
      name: "Add Product",
      path: "/dashboard/seller/add-product",
      icon: "PlusCircle",
    },
    {
      name: "My Products",
      path: "/dashboard/seller/products",
      icon: "Package",
    },
    {
      name: "Manage Orders",
      path: "/dashboard/seller/orders",
      icon: "ShoppingCart",
    },
    {
      name: "Sales Analytics",
      path: "/dashboard/seller/analytics",
      icon: "BarChart3",
    },
    {
      name: "Profile",
      path: "/dashboard/buyer/profile",
      icon: "User",
    },
  ],

  admin: [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      icon: "LayoutDashboard",
    },
    {
      name: "Manage Users",
      path: "/dashboard/admin/users",
      icon: "Users",
    },
    {
      name: "Manage Products",
      path: "/dashboard/admin/products",
      icon: "Package",
    },
    {
      name: "Manage Orders",
      path: "/dashboard/admin/orders",
      icon: "ShoppingCart",
    },
    {
      name: "Platform Analytics",
      path: "/dashboard/admin/analytics",
      icon: "BarChart3",
    },
    {
      name: "Profile",
      path: "/dashboard/admin/profile",
      icon: "User",
    },
  ],
};




export async function DashboardSidebar() {


  const user = await getUserSession()
  
  const items = navItems[user?.role]
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold"><Logo /></h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <DashboardSidebarNavItems items={items} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-sm text-muted-foreground">
          © 2026 My App
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}