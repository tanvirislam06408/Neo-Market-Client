import ProductCard from "@/components/shared/ProductCard";
import ProductsPagination from "@/components/shared/ProductsPagination";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { FadeUp } from "@/components/shared/AnimatedDiv";
import SearchBar from "@/components/shared/SearchBar";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search;
  const currentPage = Number(params.page) || 1;

  let url = search ? `/api/products?search=${search}` : `/api/products?page=${currentPage}`

  if(params.sort){
    url=`/api/products?sort=${params.sort}&page=${currentPage}`
   
    
  }
  

  const { products, totalPage } = await serverFetch(url);

  const user = await getUserSession();

  return (
    <section className="container mx-auto px-4 py-20">
      <FadeUp>
        <div className="mb-10 flex items-center flex-col gap-3 md:gap-0 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold">
              Explore Products
            </h2>

            <p className="mt-2 text-muted-foreground">
              Discover quality pre-owned items from trusted sellers.
            </p>
          </div>
          <SearchBar />
        </div>
      </FadeUp>

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
