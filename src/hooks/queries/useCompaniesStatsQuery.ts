import { GET_COMPANY_STATS } from "@/graphql/queries";
import { GetCompanyStatsQueryResult } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";


/**
 * Custom hook for fetching overall company statistics
 */
export function useCompanyStatsQuery(options = {}) {
  return useGraphQLQuery<GetCompanyStatsQueryResult, {}>(
    ['companyStats'],
    GET_COMPANY_STATS,
    {},
    {
      staleTime: 15 * 60 * 1000, // 15 minutes - stats don't change often
      ...options,
    }
  );
}