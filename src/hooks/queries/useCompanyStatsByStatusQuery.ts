import { GET_COMPANY_STATS_BY_STATUS } from "@/graphql/queries";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";

/**
 * Custom hook for fetching company statistics by status
 */
export function useCompanyStatsByStatusQuery(options = {}) {
  return useGraphQLQuery(
    ['companyStatsByStatus'],
    GET_COMPANY_STATS_BY_STATUS,
    {},
    {
      staleTime: 15 * 60 * 1000, // 15 minutes
      ...options,
    }
  );
}