"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import qs from "query-string";
import React, { useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
};

export const Pagination = ({ totalPages, hasNextPage }: PaginationProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current query parameters
  const pageFromQuery = searchParams.get("page") || "1";
  const currentType = searchParams.get("currentType");
  const currentLanguage = searchParams.get("language");
  const currentTag = searchParams.get("tag");

  const currentPage = useMemo(
    () => Math.min(Math.max(Number(pageFromQuery), 1), totalPages),
    [pageFromQuery, totalPages],
  );
  const getPagesToShow = useMemo(() => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  }, [currentPage, totalPages]);

  const createUrl = useCallback(
    (newPage: number) => {
      return qs.stringifyUrl(
        {
          url: pathname,
          query: {
            page: newPage > 1 ? newPage : undefined,
            currentType,
            language: currentLanguage,
            tag: currentTag,
          },
        },
        { skipNull: true, skipEmptyString: true },
      );
    },
    [pathname, currentType, currentLanguage, currentTag],
  );
  // Function to handle page navigation
  const handlePageChange = (newPage: number) => {
    router.push(createUrl(newPage));
  };
  return (
    <div className="flex items-center justify-center space-x-6 text-black">
      {/* Previous Button */}
      <button
        className={cn(
          "rounded-md flex font-semibold  items-center gap-1 text-white px-3 py-2 text-[16px]  hover:bg-dark-500/50 transition-all ",
          currentPage === 1 ? "pointer-events-none text-dark-500" : "",
        )}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        // aria-disabled={currentPage === 1} // Indicate that button is disabled for accessibility
      >
        <ChevronLeft /> Previous
      </button>

      {/* Page Links */}
      <div
        aria-label="Pagination"
        className="relative z-0 inline-flex space-x-1 rounded-md"
      >
        {getPagesToShow.map((p, i) => (
          <button
            key={p}
            className={cn(
              "relative rounded-md inline-flex items-center border-none text-white px-4 py-2 text-[16px] font-semibold hover:bg-dark-500/50 hover:text-primary",
              p === currentPage
                ? "pointer-events-none text-primary bg-dark-500/50"
                : "",
            )}
            onClick={() => handlePageChange(p)}
            disabled={p === currentPage}
            // aria-disabled={p === currentPage} // Indicate that page button is disabled
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={cn(
          "rounded-md flex font-semibold  items-center gap-1 text-white px-3 py-2 text-[16px]  hover:bg-dark-500/50 transition-all ",
          !hasNextPage ? "pointer-events-none text-dark-500" : "",
        )}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next <ChevronRight size={20} />
      </button>
    </div>
  );
};
