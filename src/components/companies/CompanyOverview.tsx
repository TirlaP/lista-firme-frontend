// src/components/companies/CompanyOverview.tsx
import { Tooltip } from "@/components/ui/Tooltip";
import { Company } from "@/types/company.types";
import { Info } from "lucide-react";

interface CompanyOverviewProps {
	company: Company;
}

export const CompanyOverview = ({ company }: CompanyOverviewProps) => {
	return (
		<div className="p-6 space-y-6">
			<div>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-900">
						General Information
					</h2>
					<Tooltip
						content={
							<div className="space-y-1 p-1">
								<div className="font-medium border-b border-gray-700 pb-1">
									Registration Details
								</div>
								<p>Status: {company.inregistrare?.stare}</p>
								<p>Fiscal Authority: {company.inregistrare?.organ_fiscal}</p>
							</div>
						}
					>
						<Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
					</Tooltip>
				</div>

				<div className="grid grid-cols-2 gap-6">
					{/* Registration Info */}
					<div className="space-y-1">
						<p className="text-sm font-medium text-gray-500">
							Registration Number
						</p>
						<p className="text-sm">{company.inregistrare?.numar}</p>
						<p className="text-xs text-gray-500">
							{company.inregistrare?.data &&
								new Date(company.inregistrare.data).toLocaleDateString()}
						</p>
					</div>

					{/* CAEN Info */}
					<div className="space-y-1">
						<p className="text-sm font-medium text-gray-500">CAEN Code</p>
						<div className="flex items-center gap-2">
							<p className="text-sm">{company.cod_CAEN}</p>
							{company.caen && (
								<Tooltip
									content={
										<div className="space-y-1 p-1">
											<p className="font-medium">{company.caen.name}</p>
											<p className="text-gray-200">
												Division: {company.caen.division}
											</p>
											<p className="text-gray-200">
												Section: {company.caen.section}
											</p>
										</div>
									}
								>
									<Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
								</Tooltip>
							)}
						</div>
						<p className="text-xs text-gray-500">{company.caen?.name}</p>
					</div>
				</div>
			</div>

			{/* Company Type */}
			<div>
				<h3 className="text-sm font-medium text-gray-900 mb-3">Company Type</h3>
				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-1">
						<p className="text-sm font-medium text-gray-500">Legal Form</p>
						<p className="text-sm">{company.tip_firma?.forma_juridica}</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm font-medium text-gray-500">Organization</p>
						<p className="text-sm">{company.tip_firma?.forma_organizare}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

