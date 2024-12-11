// src/services/export.service.ts
import { CompanyFilters } from "@/types/company.types";
import { apiClient } from "@/utils/axios";

class ExportService {
	async exportCompanies(filters: CompanyFilters): Promise<void> {
		try {
			// Remove pagination parameters
			const { page, limit, ...exportFilters } = filters;

			const response = await apiClient.get("/export/companies", {
				params: exportFilters,
				responseType: "blob",
				timeout: 300000, // 5 minutes timeout for large exports
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `companies-export-${Date.now()}.csv`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Export failed:", error);
			throw error;
		}
	}
}

export const exportService = new ExportService();
