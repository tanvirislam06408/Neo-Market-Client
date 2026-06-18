import Image from "next/image";
import { Heart, ShoppingCart, ShieldCheck, Phone, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage({ product }) {

  // Guard clause if the product data hasn't loaded or passed yet
  if (!product) {
    return <div className="py-12 text-center text-muted-foreground">Loading product details...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Side: Product Image */}
        <div>
          <div className="overflow-hidden rounded-3xl border bg-muted">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.title || "Product Image"}
                width={900}
                height={700}
                className="h-[550px] w-full object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            ) : (
              <div className="flex h-[550px] w-full items-center justify-center text-muted-foreground">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="space-y-8">
          {/* Tags: Category & Condition */}
          <div className="flex flex-wrap gap-3">
            {product.category && (
              <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
                {product.category}
              </span>
            )}
            {product.condition && (
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                Condition: {product.condition}
              </span>
            )}
          </div>

          {/* Title & Price */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {product.title}
            </h1>
            <p className="text-5xl font-extrabold text-primary">
              ৳{product.price ? product.price.toLocaleString() : "0"}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="leading-8 text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            

            <form className="w-full" action="/api/checkout_sessions" method="POST">
              <input
                type="hidden"
                name="productId"
                value={product._id}
              />
              <Button type="submit" size="lg" className="flex-1 w-full rounded-full text-base font-medium">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            </form>
            <Button size="lg" variant="outline" className="rounded-full px-4">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Specifications Information */}
          <div className="rounded-3xl border p-6 bg-card">
            <h3 className="mb-5 text-xl font-bold">Product Information</h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold mt-0.5">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p className="font-semibold mt-0.5">{product.condition}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize mt-0.5 text-emerald-600">
                  {product.status}
                </p>
              </div>
            </div>
          </div>

          {/* Seller Information Card */}
          {product.sellerInfo && (
            <div className="rounded-3xl border p-6 bg-card">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                <h3 className="text-xl font-bold">Seller Information</h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Seller</p>
                    <p className="font-medium text-foreground">{product.sellerInfo.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${product.sellerInfo.email}`} className="font-medium text-foreground hover:underline">
                      {product.sellerInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${product.sellerInfo.phone}`} className="font-medium text-foreground hover:underline">
                      {product.sellerInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}