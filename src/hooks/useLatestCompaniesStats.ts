import { useQuery } from "@apollo/client";
import { GET_LATEST_COMPANIES_STATS } from "@/graphql/queries";
import { TimeRange } from "@/graphql/types";

/**
 * Simple hook for fetching latest companies statistics
 */
export function useLatestCompaniesStats(
  timeRange?: string,
  customStartDate?: string,
  customEndDate?: string
) {
  // Build query input
  const input = customStartDate && customEndDate
    ? { customStartDate, customEndDate }
    : { timeRange: timeRange as TimeRange || TimeRange.LAST7DAYS };
  
  // Execute query
  const { data, loading, error } = useQuery(GET_LATEST_COMPANIES_STATS, {
    variables: { input },
    fetchPolicy: "cache-and-network",
  });
  
  return {
    data: data?.latestCompaniesStats,
    isLoading: loading,
    error,
  };
}