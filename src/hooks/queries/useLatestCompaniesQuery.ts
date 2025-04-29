import { GET_LATEST_COMPANIES } from "@/graphql/queries";
import { LatestCompaniesInput, GetLatestCompaniesQueryResult } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";

/**
 * Custom hook for fetching latest registered companies
 */
export function useLatestCompaniesQuery(
  input: LatestCompaniesInput,
  options = {}
) {
  // Make sure we set a default timeRange if one isn't provided
  const queryInput = {
    ...input,
    timeRange: input.timeRange || "LAST7DAYS",
  };

  return useGraphQLQuery<GetLatestCompaniesQueryResult, { input: LatestCompaniesInput }>(
    ['latestCompanies', queryInput],
    GET_LATEST_COMPANIES,
    { input: queryInput },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      ...options,
    }
  );
}