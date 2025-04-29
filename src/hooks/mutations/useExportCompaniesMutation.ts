import { EXPORT_COMPANIES } from "@/graphql/queries";
import { ExportCompaniesResult, ExportCompaniesInput } from "@/graphql/types";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";

/**
 * Custom hook for exporting companies data
 */
export function useExportCompaniesMutation(options = {}) {
  return useGraphQLMutation<ExportCompaniesResult, { input: ExportCompaniesInput }>(
    EXPORT_COMPANIES,
    {
      // No queries to invalidate as this doesn't affect the data state
      ...options,
    }
  );
}