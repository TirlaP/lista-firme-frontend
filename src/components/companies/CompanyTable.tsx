import { useState } from "react";
import { CompanyTableRow } from "./CompanyTableRow";
import { Button } from "antd";

export function CompanyTable({
  companies,
  isLoading,
  hasNextPage,
  totalCount,
  onLoadMore,
  emptyMessage = "No companies found matching your criteria.",
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  if (isLoading && !companies?.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <span className="text-lg text-gray-600">Loading companies...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" />
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full delay-75" />
            <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full delay-150" />
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Company Details</th>
              <th className="hidden md:table-cell px-4 py-3 text-left">Registration</th>
              <th className="hidden lg:table-cell px-4 py-3 text-left">Location</th>
              <th className="hidden xl:table-cell px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left min-w-[100px]">Actions</th>
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
          </tbody>
        </table>
        {(!companies || companies.length === 0) && (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        )}
        {hasNextPage && (
          <div className="flex justify-center p-6">
            <Button onClick={onLoadMore} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Loading...
                </>
              ) : (
                <>Load More Companies</>
              )}
            </Button>
          </div>
        )}
      </div>
      {companies.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing {companies.length} of {totalCount} companies
          </p>
        </div>
      )}
    </div>
  );
}
