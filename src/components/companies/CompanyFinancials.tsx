// src/components/companies/CompanyFinancials.tsx
import { Company } from "@/types/company.types";

interface CompanyFinancialsProps {
	company: Company;
}

export const CompanyFinancials = ({ company }: CompanyFinancialsProps) => {
	return (
		<div className="p-6">
			<h2 className="text-lg font-semibold text-gray-900 mb-4">
				Company Status
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Registration Status */}
				<div className="space-y-2">
					<h3 className="text-sm font-medium text-gray-500">
						Registration Status
					</h3>
					<div
						className={`px-3 py-2 rounded-md text-sm
            ${
							company.inregistrare?.stare === "ACTIVA"
								? "bg-green-50 text-green-700"
								: "bg-red-50 text-red-700"
						}`}
					>
						<p className="font-medium">
							{company.inregistrare?.stare || "N/A"}
						</p>
						<p className="text-xs mt-1">
							{company.inregistrare?.data &&
								new Date(company.inregistrare.data).toLocaleDateString()}
						</p>
					</div>
				</div>

				{/* Fiscal Authority */}
				<div className="space-y-2">
					<h3 className="text-sm font-medium text-gray-500">
						Fiscal Authority
					</h3>
					<div className="bg-gray-50 px-3 py-2 rounded-md">
						<p className="text-sm">
							{company.inregistrare?.organ_fiscal || "N/A"}
						</p>
					</div>
				</div>

				{/* Company Form */}
				<div className="space-y-2">
					<h3 className="text-sm font-medium text-gray-500">Company Form</h3>
					<div className="bg-gray-50 px-3 py-2 rounded-md">
						<p className="text-sm">
							{company.tip_firma?.forma_juridica || "N/A"}
						</p>
						<p className="text-xs text-gray-500 mt-1">
							{company.tip_firma?.forma_proprietate}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
