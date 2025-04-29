import {
  latestCompanyFiltersAtom,
  resetLatestCompanyFiltersAtom,
  setLatestCompanyFilterAtom,
} from "@/atoms/latest-companies";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { ExportButton } from "@/components/companies/ExportButton";
import { LatestCompaniesFilters } from "@/components/companies/LatestCompaniesFilters";
import { LatestCompaniesStats } from "@/components/companies/LatestCompaniesStats";
import { LatestCompaniesTrends } from "@/components/companies/LatestCompaniesTrends";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useLatestCompanies } from "@/hooks/useLatestCompanies";
import { useLatestCompaniesStats } from "@/hooks/useLatestCompaniesStats";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { format, subDays } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import {
  AlertCircle,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  Download,
  FileBarChart,
  Filter,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * LatestCompaniesPage - Page for displaying recently registered companies
 */
export const LatestCompaniesPage = () => {
  const filters = useAtomValue(latestCompanyFiltersAtom);
  const setFilter = useSetAtom(setLatestCompanyFilterAtom);
  const resetFilters = useSetAtom(resetLatestCompanyFiltersAtom);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [pageLoaded, setPageLoaded] = useState(false);

  // Get companies data
  const { companies, isLoading, error, hasNextPage, loadMore, totalCount } =
    useLatestCompanies();

  // Get stats data for the same time period
  const { data: statsData, isLoading: isLoadingStats } =
    useLatestCompaniesStats(
      filters.timeRange,
      filters.customStartDate,
      filters.customEndDate,
    );

  // Set page as loaded after initial render to fix issue with blank screen
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Helper to get human-readable time range description
  const getTimeRangeText = () => {
    if (filters.customStartDate && filters.customEndDate) {
      return `from ${format(new Date(filters.customStartDate), "dd MMM yyyy")} to ${format(new Date(filters.customEndDate), "dd MMM yyyy")}`;
    }

    switch (filters.timeRange) {
      case "today":
        return "registered today";
      case "yesterday":
        return "registered yesterday";
      case "last7days":
        return "registered in the last 7 days";
      case "last30days":
        return "registered in the last 30 days";
      default:
        return "registered recently";
    }
  };

  // Format number with locale
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return num.toLocaleString();
  };

  // Check if custom date range is active
  const hasCustomDateRange = filters.customStartDate && filters.customEndDate;

  // Handle date range changes
  const handleDateRangeChange = (range) => {
    if (range.from && range.to) {
      setFilter({
        key: "customStartDate",
        value: format(range.from, "yyyy-MM-dd"),
      });
      setFilter({
        key: "customEndDate",
        value: format(range.to, "yyyy-MM-dd"),
      });
      setFilter({ key: "timeRange", value: undefined });
    }
  };

  // If error loading data
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Could not load latest companies
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

  // If page is not loaded yet, show loading state
  if (!pageLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <Card className="bg-white mb-4 border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                Latest Companies
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {!isLoading && companies?.length > 0 ? (
                  <>
                    Showing {formatNumber(companies.length)} of{" "}
                    {formatNumber(totalCount)} companies {getTimeRangeText()}
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
                      className="flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-1.5" />
                      Filters
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[85vh]">
                    <div className="h-full">
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                          Time Range Filters
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
                        <LatestCompaniesFilters />
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              )}

              {/* Stats toggle button */}
              <Button
                variant={showStats ? "default" : "outline"}
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="flex items-center"
              >
                <FileBarChart className="h-4 w-4 mr-1.5" />
                Stats
              </Button>

              {/* Date range picker - desktop only */}
              {isDesktop && (
                <div className="hidden md:block">
                  <DatePickerWithRange
                    value={{
                      from: filters.customStartDate
                        ? new Date(filters.customStartDate)
                        : subDays(new Date(), 7),
                      to: filters.customEndDate
                        ? new Date(filters.customEndDate)
                        : new Date(),
                    }}
                    onChange={handleDateRangeChange}
                  />
                </div>
              )}

              {/* Export button */}
              <ExportButton
                type="latest"
                filters={{
                  timeRange: filters.timeRange,
                  customStartDate: filters.customStartDate,
                  customEndDate: filters.customEndDate,
                }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats section - conditionally shown */}
      {showStats && !isLoadingStats && statsData && (
        <div className="mb-4 grid grid-cols-1 gap-4">
          <LatestCompaniesStats stats={statsData} />
          <LatestCompaniesTrends data={statsData.dailyTrend} />
        </div>
      )}

      {/* Filters section - Desktop only */}
      {isDesktop && (
        <Card className="bg-white mb-4 border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                <h2 className="text-sm font-medium text-gray-900">
                  Time Range
                </h2>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Reset
              </Button>
            </div>

            <div className="mt-4">
              <LatestCompaniesFilters />
            </div>
          </div>
        </Card>
      )}

      {/* Companies table */}
      <div className="flex-1 min-h-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading && !companies?.length ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading Latest Companies
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              We're retrieving the latest company information. This might take a moment.
            </p>
          </div>
        ) : companies?.length === 0 && !isLoading ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="bg-gray-50 rounded-full p-3 mb-4">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Companies Found
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              {hasCustomDateRange
                ? `No companies found between ${filters.customStartDate} and ${filters.customEndDate}.`
                : `No companies found for the selected time range (${filters.timeRange || "last 7 days"}).`}
            </p>
          </div>
        ) : (
          <CompanyTable
            companies={companies || []}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            onLoadMore={loadMore}
            totalCount={totalCount || 0}
            emptyMessage={
              hasCustomDateRange
                ? `No companies found between ${filters.customStartDate} and ${filters.customEndDate}.`
                : `No companies found for the selected time range (${filters.timeRange || "last 7 days"}).`
            }
          />
        )}
      </div>
    </div>
  );
};