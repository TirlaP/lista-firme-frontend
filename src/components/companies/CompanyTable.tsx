// src/components/companies/CompanyTable.tsx
import { useCompanies } from "@/hooks/useCompanies";
import { useState } from "react";
import { CompanyTableRow } from "./CompanyTableRow";

export const CompanyTable = () => {
	const { data, isLoading, isFetching } = useCompanies();
	const [hoveredRow, setHoveredRow] = useState<string | null>(null);

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="flex items-center space-x-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
					<span className="text-lg text-gray-600">Loading companies...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="relative h-full flex flex-col">
			{isFetching && (
				<div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
					<div className="flex items-center space-x-2">
						<div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" />
						<div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full delay-75" />
						<div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full delay-150" />
					</div>
				</div>
			)}

			<div className="flex-1 min-h-0 overflow-auto">
				<table className="w-full">
					<thead className="bg-gray-50 sticky top-0 z-10">
						<tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
							<th className="px-4 py-3 text-left">Company Details</th>
							<th className="hidden md:table-cell px-4 py-3 text-left">
								Registration
							</th>
							<th className="hidden lg:table-cell px-4 py-3 text-left">
								Location
							</th>
							<th className="hidden xl:table-cell px-4 py-3 text-left">
								Contact
							</th>
							<th className="px-4 py-3 text-left min-w-[100px]">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{data?.results.map((company) => (
							<CompanyTableRow
								key={company.cui}
								company={company}
								isHovered={hoveredRow === company.nume}
								onHover={setHoveredRow}
							/>
						))}
					</tbody>
				</table>

				{data?.results.length === 0 && (
					<div className="flex items-center justify-center h-full min-h-[200px]">
						<p className="text-gray-500">
							No companies found matching your criteria.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
