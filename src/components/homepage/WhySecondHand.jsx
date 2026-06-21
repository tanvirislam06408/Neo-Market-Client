import { Recycle, Trees, Droplets, Factory } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const featured = {
  icon: Recycle,
  stat: "92M",
  statUnit: "tons of waste / year",
  title: "Keeps Items Out of Landfills",
  description:
    "Every pre-owned purchase saves an item from being discarded — and chips away at the 92 million tons sent to landfills annually.",
};

const benefits = [
  {
    icon: Trees,
    stat: "80%",
    title: "Reduces Carbon Footprint",
    description: "Avoids the emissions from manufacturing a new product from raw materials.",
  },
  {
    icon: Droplets,
    stat: "2,700L",
    title: "Conserves Water & Resources",
    description: "The water it takes to make one new cotton shirt — saved by buying used.",
  },
  {
    icon: Factory,
    stat: "0",
    title: "Less Packaging & Transport",
    description: "Skips the factory-to-warehouse chain — less plastic, less long-haul shipping.",
  },
];

export default function WhySecondHand() {
  return (
    <section className="overflow-hidden bg-[#F9F8F5] py-24">
      <div className="container mx-auto px-4">


        {/* Featured stat banner */}
        <FadeUp>
          <div className="mt-12 grid gap-8 rounded-[40px] bg-[#3E5F47] p-10 text-white md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-14">
            <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
              <span className="font-serif text-7xl leading-none md:text-8xl">
                {featured.stat}
              </span>
              <span className="text-sm uppercase tracking-wide text-white/60">
                {featured.statUnit}
              </span>
            </div>

            <div className="md:border-l md:border-white/15 md:pl-12">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <featured.icon className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">{featured.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-white/70">
                {featured.description}
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Compact supporting list */}
        <StaggerContainer>
          <div className="mt-4 grid divide-y divide-[#E7E1D9] md:grid-cols-3 md:divide-x md:divide-y-0">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="group flex items-start gap-4 py-6 md:flex-col md:gap-3 md:px-8 md:py-8">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3E5F47]/20 text-[#3E5F47] transition-colors duration-300 group-hover:bg-[#3E5F47] group-hover:text-white">
                    <benefit.icon className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl text-[#3E5F47]">
                        {benefit.stat}
                      </span>
                      <h3 className="text-base font-semibold text-[#161616]">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6F6F6F]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}