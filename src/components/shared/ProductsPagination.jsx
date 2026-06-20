import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FadeIn } from "@/components/shared/AnimatedDiv";

export default function ProductsPagination({
  currentPage,
  totalPage,
}) {
  return (
    <FadeIn>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/products?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href={`/products?page=${page}`} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPage && (
            <PaginationItem>
              <PaginationNext href={`/products?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </FadeIn>
  );
}
