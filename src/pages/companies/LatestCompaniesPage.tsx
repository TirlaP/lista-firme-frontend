import { CompanyTable } from "@/components/companies/CompanyTable";
import { ExportButton } from "@/components/companies/ExportButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLatestCompanies } from "@/hooks/useLatestCompanies";
import { useLatestCompaniesStore } from "@/store/latestCompaniesStore";
import { useEffect } from "react";

export const LatestCompaniesPage = () => {
	const { filters, setFilter } = useLatestCompaniesStore();
	const latestCompaniesQuery = useLatestCompanies();
	const { data, isLoading } = latestCompaniesQuery;

	const totalPages = data?.totalPages || 1;
	const currentPage = filters.page || 1;

	useEffect(() => {
		if (data && filters.page && filters.page > data.totalPages) {
			setFilter("page", data.totalPages);
		}
	}, [data?.totalPages]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setFilter("page", newPage);
		}
	};

	const getTimeRangeText = () => {
		switch (filters.timeRange) {
			case "today":
				return "today";
			case "yesterday":
				return "yesterday";
			case "last7days":
				return "in the last 7 days";
			case "last30days":
				return "in the last 30 days";
			case "custom":
				return "in selected period";
			default:
				return "in selected period";
		}
	};

	const formatNumber = (num: number) => {
		return num.toLocaleString();
	};

	const exportFilters = {
		timeRange: filters.timeRange,
		customStartDate: filters.customStartDate,
		customEndDate: filters.customEndDate,
	};

	return (
		<div className="h-full flex flex-col">
			<Card className="bg-white mb-4">
				<div className="p-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="space-y-1">
							<h1 className="text-xl font-semibold text-gray-900">
								Latest Companies
							</h1>
							<p className="text-sm text-gray-500">
								{!isLoading && data ? (
									<>
										Showing {formatNumber(data.results.length)} of{" "}
										{formatNumber(data.totalResults)} companies registered{" "}
										{getTimeRangeText()}
									</>
								) : (
									"Loading companies..."
								)}
							</p>
						</div>

						<div className="flex items-center gap-4">
							<ExportButton
								type="latest"
								filters={{
									timeRange: filters.timeRange,
									customStartDate: filters.customStartDate,
									customEndDate: filters.customEndDate,
								}}
							/>

							{/* Pagination controls */}
							{!isLoading && data && data.totalPages > 0 && (
								<div className="flex items-center gap-2">
									<Button
										onClick={() => handlePageChange(1)}
										disabled={currentPage === 1}
										variant="outline"
										size="sm"
										className="hidden md:inline-flex"
									>
										First
									</Button>
									<Button
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
										variant="outline"
										size="sm"
									>
										Previous
									</Button>
									<div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
										<input
											type="number"
											min={1}
											max={totalPages}
											value={currentPage}
											onChange={(e) => {
												const page = parseInt(e.target.value);
												handlePageChange(page);
											}}
											className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md text-sm"
										/>
										<span className="text-gray-500">/</span>
										<span className="text-gray-600">{totalPages}</span>
									</div>
									<Button
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
										variant="outline"
										size="sm"
									>
										Next
									</Button>
									<Button
										onClick={() => handlePageChange(totalPages)}
										disabled={currentPage === totalPages}
										variant="outline"
										size="sm"
										className="hidden md:inline-flex"
									>
										Last
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</Card>

			<div className="flex-1 min-h-0 bg-white rounded-lg border border-gray-200">
				<CompanyTable
					queryResult={latestCompaniesQuery}
					emptyMessage="No companies found in the selected time range."
				/>
			</div>
		</div>
	);
};

