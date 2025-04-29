/**
 * SkeletonRow - A loading placeholder for table rows
 * Used when fetching more data in the company table
 */
export const SkeletonRow = () => {
  return (
    <tr className="border-b border-gray-200">
      {/* Company column */}
      <td className="px-4 py-4">
        <div className="flex items-start space-x-3">
          <div className="hidden sm:block flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="flex space-x-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            </div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </td>

      {/* Registration column - hidden on mobile */}
      <td className="hidden md:table-cell px-4 py-4">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
        </div>
      </td>

      {/* Contact column - hidden on mobile and tablet */}
      <td className="hidden lg:table-cell px-4 py-4">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-36" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-28" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
        </div>
      </td>

      {/* Actions column */}
      <td className="px-4 py-4 text-right">
        <div className="inline-block h-6 bg-gray-200 rounded animate-pulse w-16 ml-auto" />
      </td>
    </tr>
  );
};
