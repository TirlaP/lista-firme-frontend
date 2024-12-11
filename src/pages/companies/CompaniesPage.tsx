// src/pages/companies/CompaniesPage.tsx
import { CompanyTable } from "@/components/companies/CompanyTable";
import { ExportButton } from "@/components/companies/ExportButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCompanies } from "@/hooks/useCompanies";
import { useFiltersStore } from "@/store/filtersStore";
import { useEffect } from "react";

export const CompaniesPage = () => {
	const { data, isLoading } = useCompanies();
	const { filters, setFilter } = useFiltersStore();

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

	const formatNumber = (num: number) => {
		return num.toLocaleString();
	};

	return (
		<div className="h-full flex flex-col">
			<Card className="bg-white mb-4">
				<div className="p-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div className="space-y-1">
							<h1 className="text-xl font-semibold text-gray-900">
								Company Directory
							</h1>
							<p className="text-sm text-gray-500">
								{!isLoading && data ? (
									<>
										Showing {formatNumber(data.results.length)} of{" "}
										{formatNumber(data.totalResults)} companies
										{Object.keys(filters).some(
											(key) => key !== "page" && key !== "limit" && filters[key]
										) && " (filtered)"}
									</>
								) : (
									"Loading companies..."
								)}
							</p>
						</div>

						<div className="flex items-center gap-4">
							<ExportButton />

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
				<CompanyTable />
			</div>
		</div>
	);
};
