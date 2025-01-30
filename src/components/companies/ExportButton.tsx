import { Button } from "@/components/ui/Button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useExportCompanies } from "@/hooks/useExportCompanies";
import {
	ExportFilters,
	ExportFormat,
	LatestExportFilters,
} from "@/types/export.types";
import { Download } from "lucide-react";
import { useState } from "react";

interface ExportButtonProps {
	type: "regular" | "latest";
	filters: ExportFilters | LatestExportFilters;
}

export const ExportButton = ({ type, filters }: ExportButtonProps) => {
	const { exportRegular, exportLatest, isExporting } = useExportCompanies();
	const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("csv");

	const handleExport = async (format: ExportFormat) => {
		const exportFilters = {
			...filters,
			format,
		};

		if (type === "regular") {
			await exportRegular(exportFilters as ExportFilters);
		} else {
			await exportLatest(exportFilters as LatestExportFilters);
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
