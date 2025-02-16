import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "@/graphql/queries";
import { useFiltersStore } from "@/store/filtersStore";
import { useDebounce } from "@/hooks/useDebounce";

export function useCompanies() {
  const filters = useFiltersStore((state) => state.filters);
  const debouncedFilters = useDebounce(filters, 500);
  const input = {
    first: 50,
    cod_CAEN: debouncedFilters.cod_CAEN,
    judet: debouncedFilters.judet,
    oras: debouncedFilters.oras,
    hasWebsite: debouncedFilters.hasWebsite === "true",
    hasContact: debouncedFilters.hasContact === "true",
    sortBy: {
      field: debouncedFilters.sortBy?.includes("desc")
        ? "REGISTRATION_DATE"
        : "REGISTRATION_DATE",
      direction: debouncedFilters.sortBy?.includes("desc") ? "DESC" : "ASC",
    },
  };
  const { data, loading, error, fetchMore } = useQuery(GET_COMPANIES, {
    variables: { input },
    notifyOnNetworkStatusChange: true,
  });
  const loadMore = async () => {
    if (!data?.companies.pageInfo.hasNextPage) return;
    try {
      await fetchMore({
        variables: {
          input: {
            ...input,
            after: data.companies.pageInfo.endCursor,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            companies: {
              ...fetchMoreResult.companies,
              edges: [...prev.companies.edges, ...fetchMoreResult.companies.edges],
            },
          };
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return {
    companies: data?.companies.edges.map((edge) => edge.node) || [],
    pageInfo: data?.companies.pageInfo,
    isLoading: loading,
    error,
    hasNextPage: data?.companies.pageInfo.hasNextPage || false,
    loadMore,
    totalCount: data?.companies.totalCount || 0,
  };
}
