import ProductCard from "@/components/shared/ProductCard";
import ProductsPagination from "@/components/shared/ProductsPagination";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const { products, totalPage } = await serverFetch(
    `/api/products?page=${currentPage}`
  );

  const user = await getUserSession();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">
          Explore Products
        </h2>

        <p className="mt-2 text-muted-foreground">
          Discover quality pre-owned items from trusted sellers.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            user={user}
          />
        ))}
      </div>

      <div className="mt-12">
        <ProductsPagination
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </section>
  );
}