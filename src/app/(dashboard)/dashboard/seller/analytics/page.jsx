"use client";

import MonthlySalesTrend from "@/components/dashboard/seller/MonthlySalesTrend";
import SalesChart from "@/components/dashboard/seller/SalesChart";
import TopSellingProducts from "@/components/dashboard/seller/TopSellingProducts";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

export default function SalesAnalytics() {
  return (
    <div className="w-full space-y-6">
      <FadeUp>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Sales Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Visual representation of your performance as a seller.
          </p>
        </div>
      </FadeUp>

      <StaggerContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StaggerItem><SalesChart /></StaggerItem>
          <StaggerItem><MonthlySalesTrend /></StaggerItem>
        </div>
      </StaggerContainer>

      <FadeUp delay={0.1}>
        <TopSellingProducts />
      </FadeUp>
    </div>
  );
}
