import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  ExportFilters,
  ExportFormat,
  LatestExportFilters,
} from "@/types/export.types";
import { gql, useMutation } from "@apollo/client";
import { Download } from "lucide-react";
import { useState } from "react";

const EXPORT_COMPANIES = gql`
  mutation ExportCompanies($input: ExportCompaniesInput!) {
    exportCompanies(input: $input) {
      fileName
      content
      mimeType
    }
  }
`;

const EXPORT_LATEST_COMPANIES = gql`
  mutation ExportLatestCompanies($input: ExportLatestCompaniesInput!) {
    exportLatestCompanies(input: $input) {
      fileName
      content
      mimeType
    }
  }
`;

interface ExportButtonProps {
  type: "regular" | "latest";
  filters: ExportFilters | LatestExportFilters;
}

export const ExportButton = ({ type, filters }: ExportButtonProps) => {
  const [exportRegular] = useMutation(EXPORT_COMPANIES);
  const [exportLatest] = useMutation(EXPORT_LATEST_COMPANIES);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    try {
      const exportFilters = {
        ...filters,
        format,
      };

      const mutation = type === "regular" ? exportRegular : exportLatest;
      const { data } = await mutation({
        variables: {
          input: exportFilters,
        },
      });

      const exportData =
        type === "regular" ? data.exportCompanies : data.exportLatestCompanies;

      // Create blob from the returned content
      let blob;
      if (format === "xlsx") {
        // For Excel files, content is base64 encoded
        const binaryString = window.atob(exportData.content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: exportData.mimeType });
      } else {
        // For CSV, content is plain text
        const bomPrefix = "\uFEFF"; // Add BOM for Excel UTF-8 compatibility
        blob = new Blob([bomPrefix + exportData.content], {
          type: exportData.mimeType,
        });
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = exportData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      // You might want to show an error toast here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isExporting}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("xlsx")}>
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
