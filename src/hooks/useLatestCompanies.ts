import { latestCompanyFiltersAtom } from "@/atoms/latest-companies";
import { useQuery } from "@apollo/client";
import { GET_LATEST_COMPANIES } from "@/graphql/queries";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

export function useLatestCompanies() {
  // Get filters from atom
  const filters = useAtomValue(latestCompanyFiltersAtom);
  
  // Simple input construction
  const variables = {
    input: {
      first: 25,
      after: null,
      timeRange: filters.timeRange,
      customStartDate: filters.customStartDate,
      customEndDate: filters.customEndDate,
      sortBy: filters.sortBy,
    },
  };

  // Query execution
  const { data, loading, error, fetchMore } = useQuery(GET_LATEST_COMPANIES, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  // Load more function for pagination
  const loadMore = useCallback(() => {
    if (!data?.latestCompanies?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: {
        input: {
          ...variables.input,
          after: data.latestCompanies.pageInfo.endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        
        return {
          latestCompanies: {
            __typename: prev.latestCompanies.__typename,
            edges: [
              ...prev.latestCompanies.edges,
              ...fetchMoreResult.latestCompanies.edges,
            ],
            pageInfo: fetchMoreResult.latestCompanies.pageInfo,
            totalCount: fetchMoreResult.latestCompanies.totalCount,
          },
        };
      },
    });
  }, [data, fetchMore, variables]);

  return {
    companies: data?.latestCompanies?.edges?.map((edge) => edge.node) || [],
    isLoading: loading,
    error,
    hasNextPage: data?.latestCompanies?.pageInfo?.hasNextPage || false,
    loadMore,
    totalCount: data?.latestCompanies?.totalCount || 0,
  };
}