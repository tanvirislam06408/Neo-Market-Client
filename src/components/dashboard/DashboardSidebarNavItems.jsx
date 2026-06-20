"use client";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Heart,
  CreditCard,
  User,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  Users,
  ShieldCheck,
} from "lucide-react";

const ICONS = {
  LayoutDashboard,
  Package,
  Heart,
  CreditCard,
  User,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  Users,
  ShieldCheck,
};

export function DashboardSidebarNavItems({ items }) {
  const { setOpenMobile } = useSidebar();

  return items.map((item) => {
    const Icon =
      typeof item.icon === "string" ? ICONS[item.icon] ?? LayoutDashboard : item.icon;
    return (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton asChild tooltip={item.name}>
          <Link
            href={item.path}
            onClick={() => setOpenMobile(false)}
            className="max-md:h-12 max-md:text-base max-md:[&>svg]:size-5"
          >
            <Icon />
            <span>{item.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}
