import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedDiv";

const sellers = [
  { name: "Elena S.", rating: "4.9", badge: "VERIFIED EXPERT", listings: 24, category: "Electronics", image: "https://i.pravatar.cc/150?img=5" },
  { name: "Marcus K.", rating: "5.0", badge: "FAST RESPONDER", listings: 12, category: "Furniture", image: "https://i.pravatar.cc/150?img=12" },
  { name: "Sarah J.", rating: "4.8", badge: "TOP RATED", listings: 56, category: "Home Goods", image: "https://i.pravatar.cc/150?img=32" },
];

export default function TopRatedSellers() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="max-w-2xl">
            <h2 className="section-title text-[#161616]">Top Rated Sellers</h2>
            <p className="mt-4 section-subtitle text-[#727272]">Vetted by the community for fair pricing and prompt shipping.</p>
          </div>
        </FadeUp>

        <StaggerContainer>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {sellers.map((seller) => (
              <StaggerItem key={seller.name}>
                <div className="flex items-center gap-5 rounded-[30px] border border-[#E7E1D9] bg-[#FCFBF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                  <Avatar className="h-20 w-20 border-2 border-[#EFE8DD]">
                    <AvatarImage src={seller.image} />
                    <AvatarFallback>{seller.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-3xl font-medium text-[#161616]">{seller.name}</h3>

                    <div className="mt-2 flex items-center gap-2">
                      <Star className="h-4 w-4 fill-[#D67B48] text-[#D67B48]" />
                      <span className="font-semibold">{seller.rating}</span>
                      <span className="text-xs uppercase tracking-[0.18em] text-[#7B7B7B]">{seller.badge}</span>
                    </div>

                    <p className="mt-2 text-base text-[#707070]">{seller.listings} listings &bull; {seller.category}</p>
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
