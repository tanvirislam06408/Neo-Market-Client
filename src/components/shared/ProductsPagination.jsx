import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductsPagination({
  currentPage,
  totalPage,
}) {
  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/products?page=${currentPage - 1}`}
            />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`/products?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        {currentPage < totalPage && (
          <PaginationItem>
            <PaginationNext
              href={`/products?page=${currentPage + 1}`}
            />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
}