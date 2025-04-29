import { GET_COMPANY } from "@/graphql/queries";
import { GetCompanyQueryResult } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";

/**
 * Custom hook for fetching a specific company by CUI
 */
export function useCompanyQuery(
  cui: number,
  options = {}
) {
  return useGraphQLQuery<GetCompanyQueryResult, { cui: number }>(
    ['company', cui],
    GET_COMPANY,
    { cui },
    {
      staleTime: 60 * 60 * 1000, // 1 hour - company details change infrequently
      ...options,
      // Only run the query if we have a valid CUI
      enabled: cui !== undefined && cui !== null && !isNaN(cui),
    }
  );
}