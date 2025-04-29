import { AUTOCOMPLETE_QUERY } from "@/graphql/queries";
import { AutocompleteQueryResult } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";

/**
 * Custom hook for autocomplete search
 */
export function useAutocompleteQuery(
  text: string,
  options = {}
) {
  return useGraphQLQuery<AutocompleteQueryResult, { text: string }>(
    ['autocomplete', text],
    AUTOCOMPLETE_QUERY,
    { text },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Only run the query if we have a search text with at least 2 characters
      enabled: typeof text === 'string' && text.length >= 2,
      ...options,
    }
  );
}