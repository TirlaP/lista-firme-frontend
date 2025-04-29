import { useCompanyStatsQuery } from "@/hooks/queries/useCompaniesStatsQuery";

/**
 * Custom hook for fetching overall company statistics
 * Backed by React Query for improved caching
 */
export function useCompanyStats() {
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    refetch
  } = useCompanyStatsQuery();
  
  return {
    stats: data?.companyStats,
    isLoading,
    isError,
    error,
    refetch,
  };
}