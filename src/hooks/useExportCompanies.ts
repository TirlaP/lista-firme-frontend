import { exportService } from "@/services/export.service";
import type { ExportFilters, LatestExportFilters } from "@/types/export.types";
import { useState } from "react";
import { toast } from "react-toastify";

export const useExportCompanies = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportRegular = async (filters: ExportFilters) => {
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

  const exportLatest = async (filters: LatestExportFilters) => {
    try {
      setIsExporting(true);
      toast.info("Starting export. This might take a while...");

      await exportService.exportLatestCompanies(filters);

      toast.success("Export completed successfully!");
    } catch (error) {
      console.error("Latest export failed:", error);
      toast.error("Failed to export latest companies. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportRegular,
    exportLatest,
    isExporting,
  };
};
