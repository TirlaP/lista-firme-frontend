// src/components/layout/Sidebar.tsx
import { CompanyFilters } from "../companies/CompanyFilters";

export const Sidebar = () => {
	return (
		<div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
			<div className="p-6">
				<h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
				<CompanyFilters />
			</div>
		</div>
	);
};
