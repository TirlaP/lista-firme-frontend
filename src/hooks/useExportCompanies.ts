import { exportService } from "@/services/export.service";
import { CompanyFilters } from "@/types/company.types";
import { useState } from "react";
import { toast } from "react-toastify";

export const useExportCompanies = () => {
	const [isExporting, setIsExporting] = useState(false);

	const exportToCSV = async (filters: CompanyFilters) => {
		try {
			setIsExporting(true);
			toast.info("Starting export. This might take a while...");

			await exportService.exportCompanies(filters);

			toast.success("Export completed successfully!");
		} catch (error) {
			console.error("Export failed:", error);
			toast.error("Failed to export companies. Please try again.");
		} finally {
			setIsExporting(false);
		}
	};

	return {
		exportToCSV,
		isExporting,
	};
};
