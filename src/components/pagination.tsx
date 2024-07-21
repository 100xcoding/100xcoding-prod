type PaginationProps = {
  page?: string;
  totalPages: number | undefined;
  hasNextPage: boolean | undefined;
};
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Pagination = (props: PaginationProps) => {
  const { page = 1, totalPages = 1, hasNextPage } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
  // const getPagesToShow = () => {
  //     let startPage = currentPage - 2;
  //     let endPage = currentPage + 2;

  //     if (currentPage <= 3) {
  //         startPage = 1;
  //         endPage = 5;
  //     } else if (currentPage >= totalPages - 2) {
  //         startPage = totalPages - 4;
  //         endPage = totalPages;
  //     }

  //     return Array.from(
  //         { length: endPage - startPage + 1 },
  //         (_, i) => startPage + i,
  //     );
  // };
  const getPagesToShow = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages <= 5) {
      // If total pages are 5 or less, show all pages
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 3) {
      // If current page is within the first 3 pages, show the first 5 pages
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      // If current page is within the last 3 pages, show the last 5 pages
      startPage = totalPages - 4;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };
  const pages = getPagesToShow();
  return (
    <div className="flex items-center justify-center space-x-6 text-black">
      <Link
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          currentPage === 1 ? "pointer-events-none bg-gray-100" : "",
        )}
        href={`?page=${currentPage - 1}`}
      >
        Previous
      </Link>

      <nav
        aria-label="Pagination"
        className="relative z-0 inline-flex -space-x-px rounded-md"
      >
        {pages.map((p, i) => (
          <Link
            key={p}
            className={cn(
              "relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50",
              p === currentPage ? "pointer-events-none bg-gray-100" : "",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : "",
            )}
            href={`?page=${p}`}
          >
            {p}
          </Link>
        ))}
      </nav>

      <Link
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          !hasNextPage ? "pointer-events-none bg-gray-100" : "",
        )}
        href={`?page=${currentPage + 1}`}
      >
        Next
      </Link>
    </div>
  );
};
