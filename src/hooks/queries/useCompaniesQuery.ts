import { GET_COMPANIES } from "@/graphql/queries";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import type { GetCompaniesQueryResult, CompanyFilterInput } from "@/types/company.types";

/**
 * Custom hook for fetching companies with filtering
 */
export function useCompaniesQuery(
  input: CompanyFilterInput, 
  options = {}
) {
  return useGraphQLQuery<GetCompaniesQueryResult, { input: CompanyFilterInput }>(
    ['companies', input],
    GET_COMPANIES,
    { input },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      ...options,
    }
  );
}