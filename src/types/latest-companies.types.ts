import { Company, CompanyFilters } from "./company.types";

export interface LatestCompanyFilters {
	timeRange?: "today" | "yesterday" | "last7days" | "last30days" | "custom";
	customStartDate?: string;
	customEndDate?: string;
	page?: number;
	limit?: number;
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
	timeRange: string;
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
	timeRange: string;
	dateRange: {
		from: string;
		to: string;
	};
}
