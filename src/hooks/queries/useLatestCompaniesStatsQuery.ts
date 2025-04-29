import { GET_LATEST_COMPANIES_STATS } from "@/graphql/queries";
import { TimeRange } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";

// Define the interface matching your GraphQL type
interface LatestCompaniesStatsInput {
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
}

interface GetLatestCompaniesStatsQueryResult {
  latestCompaniesStats: {
    totalNew: number;
    topCAEN: { code: string; count: number }[];
    topLocations: { location: string; count: number }[];
    dailyTrend: { date: string; count: number }[];
    timeRange: string;
    dateRange: {
      from: string;
      to: string;
    };
  };
}

/**
 * Custom hook for fetching latest companies statistics
 */
export function useLatestCompaniesStatsQuery(
  input: LatestCompaniesStatsInput,
  options = {}
) {
  // Make sure we set a default timeRange if custom dates are not provided
  const queryInput = !input.customStartDate || !input.customEndDate 
    ? { ...input, timeRange: input.timeRange || TimeRange.LAST7DAYS }
    : input;

  return useGraphQLQuery<
    GetLatestCompaniesStatsQueryResult,
    { input: LatestCompaniesStatsInput }
  >(
    ['latestCompaniesStats', queryInput],
    GET_LATEST_COMPANIES_STATS,
    { input: queryInput },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    }
  );
}