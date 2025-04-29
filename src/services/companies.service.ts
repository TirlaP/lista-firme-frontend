import { apiClient } from "@/services/apiClient";
// src/services/companies.service.ts
import type {
  Company,
  CompanyFilters,
  CompanyResponse,
} from "@/types/company.types";

class CompanyService {
  async getCompanies(filters: CompanyFilters): Promise<CompanyResponse> {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== "",
      ),
    ) as CompanyFilters;

    const { data } = await apiClient.get<CompanyResponse>("/companies", {
      params: cleanFilters,
    });

    return {
      ...data,
      page: Math.min(filters.page || 1, data.totalPages || 1),
    };
  }

  async getCompanyByCui(cui: number): Promise<Company> {
    const { data } = await apiClient.get<Company>(`/companies/${cui}`);
    return data;
  }

  async searchCompaniesByName(
    query: string,
    options?: { page?: number; limit?: number },
  ): Promise<CompanyResponse> {
    const { data } = await apiClient.get<CompanyResponse>("/companies/search", {
      params: {
        q: query,
        ...options,
      },
    });
    return data;
  }
}

export const companiesService = new CompanyService();
