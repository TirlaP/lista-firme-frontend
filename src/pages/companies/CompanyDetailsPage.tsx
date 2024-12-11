// src/pages/companies/CompanyDetailsPage.tsx
import { CompanyContact } from "@/components/companies/CompanyContact";
import { CompanyFinancials } from "@/components/companies/CompanyFinancials";
import { CompanyOverview } from "@/components/companies/CompanyOverview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const CompanyDetailsPage = () => {
	const { cui } = useParams();
	const navigate = useNavigate();
	const { data: company, isLoading } = useCompanyDetails(cui!);

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="flex items-center space-x-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
					<span className="text-gray-600">Loading company details...</span>
				</div>
			</div>
		);
	}

	if (!company) {
		return (
			<div className="h-full flex flex-col items-center justify-center">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Company not found
				</h2>
				<Button onClick={() => navigate("/companies")}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Back to Companies
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<Button
					variant="ghost"
					onClick={() => navigate("/companies")}
					className="gap-2"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Companies
				</Button>
			</div>

			{/* Company Header */}
			<div className="space-y-2">
				<h1 className="text-2xl font-bold text-gray-900">{company.nume}</h1>
				<div className="flex items-center gap-2">
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium
            ${
							company.inregistrare?.stare === "ACTIVA"
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{company.inregistrare?.stare || "N/A"}
					</span>
					<span className="text-sm text-gray-500">CUI: {company.cui}</span>
				</div>
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Info */}
				<Card className="lg:col-span-2">
					<CompanyOverview company={company} />
				</Card>

				{/* Contact */}
				<Card>
					<CompanyContact company={company} />
				</Card>

				{/* Financials */}
				<Card className="lg:col-span-3">
					<CompanyFinancials company={company} />
				</Card>
			</div>
		</div>
	);
};
