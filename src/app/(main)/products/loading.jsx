import { ProductCardGridSkeleton } from "@/components/shared/ProductCardSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-5 w-96" />
      </div>

      <ProductCardGridSkeleton count={8} />

      <div className="mt-12 flex justify-center">
        <Skeleton className="h-10 w-80 rounded-full" />
      </div>
    </section>
  )
}
