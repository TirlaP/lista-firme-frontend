export type ExportFormat = "csv" | "xlsx";

export interface ExportFilters {
  cod_CAEN?: string;
  judet?: string;
  oras?: string;
  hasWebsite?: string;
  hasContact?: string;
  sortBy?: "registration_date_desc" | "registration_date_asc";
  format?: ExportFormat;
}

export interface LatestExportFilters {
  timeRange?: "today" | "yesterday" | "last7days" | "last30days" | "custom";
  customStartDate?: string;
  customEndDate?: string;
  format?: ExportFormat;
}

export interface BaseExportServiceResponse {
  success: boolean;
  message: string;
  data?: any;
}
