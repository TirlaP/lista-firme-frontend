import { useCompanyStatsByStatusQuery } from "@/hooks/queries/useCompanyStatsByStatusQuery";

/**
 * Custom hook for fetching company statistics by status
 * Backed by React Query for improved caching
 */
export function useCompanyStatsByStatus() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useCompanyStatsByStatusQuery();
  
  return {
    stats: data?.companyStatsByStatus || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}