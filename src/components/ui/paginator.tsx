// this is where you'd implement some pagination logic like whether a next page is available, which can then be imported to the DataTable

import { useCallback } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import type { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginatorProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
};

const Paginator: FC<PaginatorProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const classExtend =
    "py-1 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white";
  const classActive = "text-white bg-emerald-600 dark:bg-emerald-600";
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const classDisabled = "cursor-not-allowed opacity-50";
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pageNumbers.push({
        page: i,
        isActive,
      });
    }

    return pageNumbers.map(({ page, isActive }) => (
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          className={`px-3 ${classExtend} ${isActive && classActive}`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {currentPage} of {totalPages}
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem className="hidden lg:inline-flex">
              <PaginationLink
                href="#"
                className={`px-1 ${classExtend} ${isFirstPage && classDisabled}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                aria-disabled={isFirstPage}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={`px-3 ${classExtend} ${isFirstPage && classDisabled}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              tabIndex={currentPage === 1 ? -1 : undefined}
              aria-disabled={isFirstPage}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href="#"
              className={`px-3 ${classExtend} ${isLastPage && classDisabled}`}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              tabIndex={isLastPage ? -1 : undefined}
              aria-disabled={isLastPage}
            />
          </PaginationItem>
          {currentPage !== totalPages && (
            <PaginationItem className="hidden lg:inline-flex">
              <PaginationLink
                href="#"
                className={`px-1 ${classExtend} ${isLastPage && classDisabled}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                aria-disabled={isLastPage}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { Paginator };
