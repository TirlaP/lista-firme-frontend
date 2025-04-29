import { useQuery } from '@tanstack/react-query';
import { client } from '@/apollo/client';
import { DocumentNode } from 'graphql';

/**
 * A custom hook that integrates TanStack React Query with Apollo GraphQL
 * 
 * @param queryKey - Unique key for TanStack React Query cache
 * @param query - GraphQL query document
 * @param variables - GraphQL query variables
 * @param options - Additional options for React Query
 */
export function useGraphQLQuery<TData = unknown, TVariables = Record<string, unknown>>(
  queryKey: unknown[],
  query: DocumentNode,
  variables?: TVariables,
  options?: {
    staleTime?: number;
    cacheTime?: number;
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    [key: string]: any;
  }
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await client.query<TData>({
        query,
        variables,
        // We'll let React Query handle caching
        fetchPolicy: 'network-only',
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // Default: 5 minutes
    gcTime: 10 * 60 * 1000,   // Default: 10 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
}