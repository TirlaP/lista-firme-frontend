import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/apollo/client';
import { DocumentNode } from 'graphql';

/**
 * A custom hook that integrates TanStack React Query mutation with Apollo GraphQL
 * 
 * @param mutation - GraphQL mutation document
 * @param options - Additional options for React Query mutation
 */
export function useGraphQLMutation<TData = unknown, TVariables = Record<string, unknown>>(
  mutation: DocumentNode,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void;
    invalidateQueries?: unknown[][];
    [key: string]: any;
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const { data } = await client.mutate<TData>({
        mutation,
        variables,
      });
      return data as TData;
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries when a mutation is successful
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      if (options?.onSuccess) {
        options.onSuccess(data, variables);
      }
    },
    ...options,
  });
}