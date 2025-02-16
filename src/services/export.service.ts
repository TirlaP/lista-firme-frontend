import {
	ExportFilters,
	ExportFormat,
	LatestExportFilters,
} from "@/types/export.types";
import { apiClient } from "@/utils/apiClient";

class ExportService {
	async exportCompanies(filters: ExportFilters): Promise<void> {
		try {
			const format = filters.format || "csv";
			const response = await apiClient.get("/export/companies", {
				params: filters,
				responseType: "blob",
				timeout: 300000, // 5 minutes
			});

			this.downloadFile(response.data, "companies", format);
		} catch (error) {
			console.error("Export failed:", error);
			throw error;
		}
	}

	async exportLatestCompanies(filters: LatestExportFilters): Promise<void> {
		try {
			const format = filters.format || "csv";
			const response = await apiClient.get("/export/companies/latest", {
				params: filters,
				responseType: "blob",
				timeout: 300000, // 5 minutes
			});

			this.downloadFile(response.data, "latest-companies", format);
		} catch (error) {
			console.error("Latest companies export failed:", error);
			throw error;
		}
	}

	private downloadFile(data: Blob, prefix: string, format: ExportFormat): void {
		const extension = format === "xlsx" ? "xlsx" : "csv";
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute(
			"download",
			`${prefix}-export-${Date.now()}.${extension}`
		);
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);
	}
}

export const exportService = new ExportService();
