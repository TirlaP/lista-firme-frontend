import { Button } from "@/components/ui/Button";
import { useExportCompanies } from "@/hooks/useExportCompanies";
import { useFiltersStore } from "@/store/filtersStore";
import { Download } from "lucide-react";

export const ExportButton = () => {
	const filters = useFiltersStore((state) => state.filters);
	const { exportToCSV, isExporting } = useExportCompanies();

	return (
		<Button
			onClick={() => exportToCSV(filters)}
			disabled={isExporting}
			className="flex items-center gap-2"
		>
			<Download className="h-4 w-4" />
			{isExporting ? "Exporting..." : "Export"}
		</Button>
	);
};

