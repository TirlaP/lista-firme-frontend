import { filtersAtom, resetFiltersAtom } from "@/atoms/filters";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { CompanyStats } from "@/components/companies/CompanyStats";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { ExportButton } from "@/components/companies/ExportButton";
import { SortSelector } from "@/components/companies/SortSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompanyStats } from "@/hooks/useCompanyStats";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAtomValue, useSetAtom } from "jotai";
import {
  ArrowUpDown,
  Building2,
  ChevronLeft,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

/**
 * CompaniesPage - Main page for displaying and filtering the company directory
 */
export function CompaniesPage() {
  const { companies, isLoading, error, hasNextPage, loadMore, totalCount } =
    useCompanies();
  const { stats, isLoading: isLoadingStats } = useCompanyStats();

  const filters = useAtomValue(filtersAtom);
  const resetFilters = useSetAtom(resetFiltersAtom);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Format number with locale
  const formatNumber = (num) => {
    return num?.toLocaleString() || "0";
  };

  // Determine if any filters are active
  const hasActiveFilters = Object.keys(filters).some(
    (key) => !["page", "sortBy"].includes(key) && filters[key],
  );

  // If error loading data
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Could not load companies
          </h2>
          <p className="text-gray-600 mb-6">
            {error.message ||
              "An unexpected error occurred while loading company data."}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mx-auto"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Sidebar filters for desktop */}
      {isDesktop && (
        <div className="hidden lg:block w-80 flex-shrink-0 border-r border-gray-200 h-full">
          <div className="h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filters
              </h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Reset
                </Button>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <CompanyFilters />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <Card className="bg-white mb-4 border-gray-200">
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-gray-500" />
                  Company Directory
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {!isLoading ? (
                    <>
                      Showing {formatNumber(companies?.length || 0)} of{" "}
                      {formatNumber(totalCount || 0)} companies
                      {hasActiveFilters && " (filtered)"}
                    </>
                  ) : (
                    "Loading companies..."
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-stretch">
                {/* Mobile filter button */}
                {!isDesktop && (
                  <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center whitespace-nowrap"
                      >
                        <Filter className="h-4 w-4 mr-1.5" />
                        Filters
                        {hasActiveFilters && (
                          <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                            {
                              Object.keys(filters).filter(
                                (key) =>
                                  !["page", "sortBy"].includes(key) &&
                                  filters[key],
                              ).length
                            }
                          </span>
                        )}
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="h-[85vh]">
                      <div className="h-full">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFiltersOpen(false)}
                          >
                            <ChevronLeft className="h-4 w-4 mr-1.5" />
                            Back
                          </Button>
                        </div>
                        <div className="p-4 h-[calc(100%-4rem)] overflow-auto">
                          <CompanyFilters />
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}

                {/* Sort dropdown */}
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-1 text-gray-500"
                    disabled
                  >
                    <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
                    Sort:
                  </Button>
                  <SortSelector />
                </div>

                {/* Export button */}
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

        {/* Stats cards - works on mobile and desktop */}
        {!isLoadingStats && (
          <div className="mb-4">
            <CompanyStats stats={stats} isLoading={isLoadingStats} />
          </div>
        )}

        {/* Company table */}
        <div className="flex-1 min-h-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <CompanyTable
            companies={companies || []}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            totalCount={totalCount || 0}
            onLoadMore={loadMore}
            emptyMessage={
              hasActiveFilters
                ? "No companies found matching your filters. Try adjusting your search criteria."
                : "No companies found in the database."
            }
          />
        </div>
      </div>
    </div>
  );
}