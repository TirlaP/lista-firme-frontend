import { useCompaniesQuery } from "./queries/useCompaniesQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { client } from "@/apollo/client";
import { GET_COMPANIES } from "@/graphql/queries";
import { filtersAtom } from "@/atoms/filters";
import { CompanySortField, SortDirection } from "@/types/company.types";

/**
 * useCompanies - Custom hook for fetching and paginating company data
 *
 * Features:
 * - Automatic debouncing of filter changes
 * - Infinite scrolling support
 * - Loading states and error handling
 * - Enhanced caching with React Query
 */
export function useCompanies() {
  // Get filters from Jotai atom and debounce them
  const filters = useAtomValue(filtersAtom);
  const debouncedFilters = useDebounce(filters, 500);

  // Pagination state for infinite scrolling
  const [loadedCompanies, setLoadedCompanies] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  
  // Track filter changes to force refresh
  const [lastAppliedFilters, setLastAppliedFilters] = useState(null);
  const [forceRefetch, setForceRefetch] = useState(0);

  // Determine sort field based on filter value
  const getSortField = (): CompanySortField => {
    if (debouncedFilters.sortBy?.includes("cui")) {
      return CompanySortField.CUI;
    } else if (debouncedFilters.sortBy?.includes("nume")) {
      return CompanySortField.NUME;
    } else {
      return CompanySortField.REGISTRATION_DATE;
    }
  };

  // Build query input from filters
  const input = {
    first: 25, // Smaller page size for faster initial load

    // CAEN filters - use multiple caen_codes if available, otherwise single code
    caen_codes: debouncedFilters.caen_codes,
    cod_CAEN: !debouncedFilters.caen_codes?.length
      ? debouncedFilters.cod_CAEN
      : undefined,

    // Location filters
    judet: debouncedFilters.judet,
    oras: debouncedFilters.oras,

    // Contact filters
    hasWebsite: debouncedFilters.hasWebsite === "true",
    hasEmail: debouncedFilters.hasEmail === "true",
    hasPhone: debouncedFilters.hasPhone === "true",
    hasAdmin: debouncedFilters.hasAdmin === "true",

    // Company status filter
    stare: debouncedFilters.stare,

    // Financial filters
    cifraAfaceriMin: debouncedFilters.cifraAfaceriMin,
    cifraAfaceriMax: debouncedFilters.cifraAfaceriMax,
    profitMin: debouncedFilters.profitMin,
    profitMax: debouncedFilters.profitMax,
    angajatiMin: debouncedFilters.angajatiMin,
    angajatiMax: debouncedFilters.angajatiMax,
    anInfiintareMin: debouncedFilters.anInfiintareMin,
    anInfiintareMax: debouncedFilters.anInfiintareMax,

    // Sorting
    sortBy: {
      field: getSortField(),
      direction: debouncedFilters.sortBy?.includes("asc") 
        ? SortDirection.ASC 
        : SortDirection.DESC,
    },
    after: null, // Initial load doesn't have cursor
  };

  // Query using React Query - notice we're adding forceRefetch to queryKey
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isFetching,
  } = useCompaniesQuery(input, {
    // Add this to ensure we refetch on filter changes
    queryKey: ['companies', input, forceRefetch],
    // Disable caching for status filter to ensure fresh data
    staleTime: debouncedFilters.stare ? 0 : 5 * 60 * 1000,
  });

  // Detect when filters change
  useEffect(() => {
    // Stringify for comparison (ignoring page and after parameters)
    const currentFilters = JSON.stringify({
      ...debouncedFilters,
      page: undefined,
    });

    if (lastAppliedFilters !== null && lastAppliedFilters !== currentFilters) {
      // Filters changed, force reset and refetch
      setLoadedCompanies([]);
      setEndCursor(null);
      setHasMorePages(true);
      setForceRefetch(prev => prev + 1); // Trigger refetch
      
      // Log for debugging
      console.log("Filters changed, forcing refresh", {
        prev: JSON.parse(lastAppliedFilters),
        current: JSON.parse(currentFilters)
      });
    }

    setLastAppliedFilters(currentFilters);
  }, [debouncedFilters, lastAppliedFilters]);

  // Update state when data changes
  useEffect(() => {
    if (data?.companies) {
      const { edges, pageInfo } = data.companies;

      // If this is a new query (not pagination), replace data
      if (!endCursor) {
        setLoadedCompanies(edges.map((edge) => edge.node));
      }

      setEndCursor(pageInfo.endCursor);
      setHasMorePages(pageInfo.hasNextPage);
    }
  }, [data, endCursor]);

  // Load more function for infinite scrolling/pagination
  const loadMore = useCallback(async () => {
    if (!hasMorePages || isLoading || isFetching) return;

    try {
      // We use the Apollo client directly for pagination to avoid
      // complexity with React Query's infinite query patterns
      const result = await client.query({
        query: GET_COMPANIES,
        variables: {
          input: {
            ...input,
            after: endCursor,
          },
        },
        fetchPolicy: 'network-only', // Force network request
      });

      if (result?.data?.companies) {
        const { edges, pageInfo } = result.data.companies;

        // Append new data
        setLoadedCompanies((prev) => [
          ...prev,
          ...edges.map((edge) => edge.node),
        ]);
        setEndCursor(pageInfo.endCursor);
        setHasMorePages(pageInfo.hasNextPage);
      }
    } catch (err) {
      console.error("Error loading more companies:", err);
    }
  }, [endCursor, hasMorePages, isLoading, isFetching, input]);

  // Reset and reload data
  const refresh = useCallback(() => {
    setLoadedCompanies([]);
    setEndCursor(null);
    setHasMorePages(true);
    setForceRefetch(prev => prev + 1); // Force a refetch
    refetch();
  }, [refetch]);

  return {
    companies: loadedCompanies,
    isLoading: isLoading || isFetching,
    isRefetching: isFetching,
    error,
    hasNextPage: hasMorePages,
    loadMore,
    refresh,
    totalCount: data?.companies?.totalCount || 0,
  };
}