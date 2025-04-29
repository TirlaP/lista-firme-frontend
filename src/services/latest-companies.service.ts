import { apiClient } from "@/services/apiClient";
import type {
  LatestCompanyFilters,
  LatestCompanyResponse,
  LatestCompanyStats,
} from "@/types/latest-companies.types";

class LatestCompaniesService {
  async getLatestCompanies(
    filters: LatestCompanyFilters,
  ): Promise<LatestCompanyResponse> {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    ) as LatestCompanyFilters;

    const { data } = await apiClient.get<LatestCompanyResponse>(
      "/companies/latest",
      {
        params: cleanFilters,
      },
    );

    return data;
  }

  async getLatestStats(
    timeRange: string,
    customStartDate?: string,
    customEndDate?: string,
  ): Promise<LatestCompanyStats> {
    const { data } = await apiClient.get<LatestCompanyStats>(
      "/companies/latest/stats",
      {
        params: {
          timeRange,
          customStartDate,
          customEndDate,
        },
      },
    );
    return data;
  }
}

export const latestCompaniesService = new LatestCompaniesService();
