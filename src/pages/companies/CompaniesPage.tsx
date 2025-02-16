import { Card } from "@/components/ui/Card";
import { ExportButton } from "@/components/companies/ExportButton";
import { useCompanies } from "@/hooks/useCompanies";
import { useFiltersStore } from "@/store/filtersStore";
import { CompanyTable } from "@/components/companies/CompanyTable";

export function CompaniesPage() {
  const { companies, isLoading, error, hasNextPage, loadMore, totalCount } = useCompanies();
  const { filters } = useFiltersStore();
  const formatNumber = (num: number) => {
    return num?.toLocaleString() || "0";
  };
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Error loading companies: {error.message}</p>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col">
      <Card className="bg-white mb-4">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold text-gray-900">Company Directory</h1>
              <p className="text-sm text-gray-500">
                {!isLoading ? (
                  <>
                    Showing {formatNumber(companies.length)} of{" "}
                    {formatNumber(totalCount)} companies
                    {Object.keys(filters).some(
                      (key) => !["page", "sortBy"].includes(key) && filters[key]
                    ) && " (filtered)"}
                  </>
                ) : (
                  "Loading companies..."
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ExportButton
                type="regular"
                filters={{
                  cod_CAEN: filters.cod_CAEN,
                  judet: filters.judet,
                  oras: filters.oras,
                  hasWebsite: filters.hasWebsite,
                  hasContact: filters.hasContact,
                  sortBy: filters.sortBy,
                }}
              />
            </div>
          </div>
        </div>
      </Card>
      <div className="flex-1 min-h-0 bg-white rounded-lg border border-gray-200">
        <CompanyTable
          companies={companies}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          totalCount={totalCount}
          onLoadMore={loadMore}
          emptyMessage="No companies found matching your filters."
        />
      </div>
    </div>
  );
}
