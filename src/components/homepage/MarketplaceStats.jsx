import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const stats = [
  { value: "124,820", label: "TOTAL PRODUCTS" },
  { value: "48,310", label: "VERIFIED SELLERS" },
  { value: "212,540", label: "ACTIVE BUYERS" },
  { value: "1.2M", label: "COMPLETED ORDERS" },
];

export default function MarketplaceStats() {
  return (
    <section className="py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="max-w-xl">
            <h2 className="section-title text-[#161616]">Marketplace Statistics</h2>
            <p className="mt-4 section-subtitle">A snapshot of community activity this quarter.</p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-[32px] border border-[#E9E4DC] bg-[#FCFBF8] px-8 py-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <h3 className="text-5xl font-bold tracking-tight text-[#161616]">{stat.value}</h3>
                  <p className="mt-5 text-sm uppercase tracking-[0.2em] text-[#6F6F6F]">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
