import type { Company } from "./company.types";
import { TimeRange, CompanySortField, SortDirection } from "@/graphql/types";

// Define CompanyFilters if it's not available in company.types
export interface CompanyFilters {
  cod_CAEN?: string;
  judet?: string;
  oras?: string;
  hasWebsite?: boolean;
  hasContact?: boolean;
  hasEmail?: boolean;
  hasPhone?: boolean;
  page?: number;
  limit?: number;
  sortBy?: {
    field: string;
    direction: string;
  };
}

export interface LatestCompanyFilters {
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
  page?: number;
  limit?: number;
  sortBy?: {
    field: CompanySortField;
    direction: SortDirection;
  };
}

export interface ExportFilters extends Omit<CompanyFilters, "page" | "limit"> {}
export interface LatestExportFilters
  extends Omit<LatestCompanyFilters, "page" | "limit"> {}

export interface ExportFilterProps {
  filters: ExportFilters | LatestExportFilters;
  isLatest?: boolean;
}

export interface LatestCompanyStats {
  totalNew: number;
  topCAEN: Array<{
    _id: string;
    count: number;
  }>;
  topLocations: Array<{
    _id: string;
    count: number;
  }>;
  dailyTrend: Array<{
    _id: string;
    count: number;
  }>;
  // We still return the date range info from backend
  dateRange: {
    from: string;
    to: string;
  };
}

export interface LatestCompanyResponse {
  results: Company[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  dateRange: {
    from: string;
    to: string;
  };
}