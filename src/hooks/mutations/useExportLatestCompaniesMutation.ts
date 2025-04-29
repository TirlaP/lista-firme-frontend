import { EXPORT_LATEST_COMPANIES } from "@/graphql/queries";
import { ExportLatestCompaniesResult, ExportLatestCompaniesInput } from "@/graphql/types";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";

/**
 * Custom hook for exporting latest companies data
 */
export function useExportLatestCompaniesMutation(options = {}) {
  return useGraphQLMutation<
    ExportLatestCompaniesResult,
    { input: ExportLatestCompaniesInput }
  >(
    EXPORT_LATEST_COMPANIES,
    {
      // No queries to invalidate as this doesn't affect the data state
      ...options,
    }
  );
}