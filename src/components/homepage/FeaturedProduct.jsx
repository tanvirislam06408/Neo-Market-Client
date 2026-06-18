import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { serverFetch } from "@/lib/core/server";


export default async function FeaturedProducts() {
  const products= await serverFetch('/api/featuredProduct');
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ECEAE5] px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[#3E5F47]" />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Fresh Today
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Featured Items
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 text-lg text-[#3E5F47] hover:text-[#2F4A37] transition-colors md:flex font-medium"
          >
            View all products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Cards */}
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  {products.map((product) => (
    <Card
      key={product._id}
      className="overflow-hidden rounded-[32px] border-0 bg-transparent shadow-none group"
    >
      <CardContent className="p-2">
        <Link href={`/products/${product._id}`}>
          <div className="relative overflow-hidden rounded-[32px] bg-[#ECEAE5] shadow-sm transition-all duration-300 group-hover:shadow-md">
            {/* Condition Badge */}
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold tracking-wide text-[#3E5F47] shadow-sm">
              {product.condition}
            </div>

            {/* Category Badge */}
            <div className="absolute right-4 bottom-4 z-10 rounded-full bg-[#3E5F47] px-3 py-1 text-xs font-medium text-white">
              {product.category}
            </div>

            <Image
              src={product.images?.[0]}
              alt={product.title}
              width={500}
              height={500}
              className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute right-4 top-4 translate-x-4 -translate-y-4 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur-sm shadow-sm transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5 text-[#3E5F47]" />
            </div>
          </div>
        </Link>

        <div className="mt-5 flex items-start justify-between gap-4 px-2">
          <div className="flex-1">
            <h3 className="line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-[#3E5F47]">
              {product.title}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-3 text-xs text-muted-foreground">
              Sold by{" "}
              <span className="font-medium text-[#3E5F47]">
                {product.sellerInfo.name}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="block text-xl font-bold text-[#3E5F47]">
              ৳{product.price.toLocaleString()}
            </span>

            <span
              className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                product.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

        {/* Mobile Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 rounded-full bg-[#ECEAE5] px-6 py-3 text-sm font-medium text-[#3E5F47] transition-colors hover:bg-[#dfddd8]"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}