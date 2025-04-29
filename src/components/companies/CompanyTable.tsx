import { Button } from "@/components/ui/button.tsx";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CompanyTableRow } from "./CompanyTableRow";
import { SkeletonRow } from "./SkeletonRow.tsx";

/**
 * CompanyTable - Responsive table for displaying company data with virtualization and infinite scroll
 */
export function CompanyTable({
  companies = [],
  isLoading,
  hasNextPage,
  totalCount,
  onLoadMore,
  emptyMessage = "No companies found matching your criteria.",
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 });
  const loadMoreTriggered = useRef(false);

  // Reset loading trigger when companies change
  useEffect(() => {
    loadMoreTriggered.current = false;
  }, [companies]);

  // Handle automatic loading when scroll reaches the load more trigger
  useEffect(() => {
    if (inView && hasNextPage && !isLoading && !loadMoreTriggered.current) {
      loadMoreTriggered.current = true;
      onLoadMore();
    }
  }, [inView, hasNextPage, isLoading, onLoadMore]);

  // Loading screen for initial load
  if (isLoading && !companies?.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Loading Companies
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          We're retrieving company information. This might take a moment as we
          process the data.
        </p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && companies?.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="bg-gray-50 rounded-full p-3 mb-4">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Companies Found
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Overlay loading indicator for subsequent data fetches */}
      {isLoading && companies.length > 0 && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 rounded-full shadow-md px-3 py-2 flex items-center space-x-2">
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
          <span className="text-sm font-medium">Loading more...</span>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Company</th>
              <th className="hidden md:table-cell px-4 py-3 text-left">
                Registration
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">
                Contact
              </th>
              <th className="px-4 py-3 text-right min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {companies.map((company) => (
              <CompanyTableRow
                key={company.cui}
                company={company}
                isHovered={hoveredRow === company.denumire}
                onHover={setHoveredRow}
              />
            ))}

            {/* Show skeleton rows while loading more */}
            {isLoading &&
              hasNextPage &&
              Array(3)
                .fill(0)
                .map((_, i) => <SkeletonRow key={`skeleton-${i}`} />)}
          </tbody>
        </table>

        {/* Invisible load more trigger for infinite scroll */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-20 flex items-center justify-center py-4"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                <div className="animate-pulse w-2 h-2 bg-primary rounded-full delay-75" />
                <div className="animate-pulse w-2 h-2 bg-primary rounded-full delay-150" />
              </div>
            ) : (
              <Button
                onClick={() => {
                  loadMoreTriggered.current = true;
                  onLoadMore();
                }}
                variant="ghost"
                size="sm"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Load more companies
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Table footer with stats */}
      {companies?.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
          <span>
            Showing {companies?.length} of {totalCount.toLocaleString()}{" "}
            companies
          </span>

          {hasNextPage && (
            <Button
              onClick={() => {
                loadMoreTriggered.current = true;
                onLoadMore();
              }}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                "Load More"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
