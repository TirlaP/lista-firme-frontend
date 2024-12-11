// src/components/companies/CompanyTableRow.tsx
import { Tooltip } from "@/components/ui/Tooltip";
import { Company } from "@/types/company.types";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompanyTableRowProps {
	company: Company;
	isHovered: boolean;
	onHover: (name: string | null) => void;
}

export const CompanyTableRow = ({
	company,
	isHovered,
	onHover,
}: CompanyTableRowProps) => {
	const navigate = useNavigate();

	const handleRowClick = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(`/companies/${company.cui}`);
	};

	return (
		<tr
			className="hover:bg-gray-50 transition-colors cursor-pointer"
			onMouseEnter={() => onHover(company.nume)}
			onMouseLeave={() => onHover(null)}
			onClick={handleRowClick}
		>
			<td className="px-4 py-4">
				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium text-gray-900">
						{company.nume}
					</span>
					<span className="text-xs text-gray-500 line-clamp-2">
						{company.adresa_completa}
					</span>
					<span className="md:hidden text-xs text-gray-400">
						CUI: {company.cui} | CAEN: {company.cod_CAEN}
					</span>
				</div>
			</td>

			<td className="hidden md:table-cell px-4 py-4">
				<div className="flex items-center space-x-2">
					<div className="flex flex-col">
						<span className="text-sm text-gray-900">{company.cod_CAEN}</span>
						<span className="text-xs text-gray-500">
							{company.inregistrare?.numar}
						</span>
					</div>
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
			</td>

			<td className="hidden lg:table-cell px-4 py-4">
				<div className="flex flex-col">
					<span className="text-sm text-gray-900">{company.adresa.judet}</span>
					<span className="text-xs text-gray-500">
						{company.adresa.localitate}
					</span>
				</div>
			</td>

			<td className="hidden xl:table-cell px-4 py-4">
				<div className="flex flex-col space-y-1">
					{company.contact.telefon && (
						<a
							href={`tel:${company.contact.telefon}`}
							className="text-sm text-blue-600 hover:text-blue-800"
							onClick={(e) => e.stopPropagation()}
						>
							{company.contact.telefon}
						</a>
					)}
					{company.contact.email && (
						<a
							href={`mailto:${company.contact.email}`}
							className="text-sm text-blue-600 hover:text-blue-800"
							onClick={(e) => e.stopPropagation()}
						>
							{company.contact.email}
						</a>
					)}
				</div>
			</td>

			<td className="px-4 py-4">
				<div className="flex items-center space-x-3">
					{company.contact.website && (
						<a
							href={company.contact.website}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:text-blue-800"
							onClick={(e) => e.stopPropagation()}
						>
							Visit Site
						</a>
					)}
					<Tooltip
						content={
							<div className="space-y-1 p-1">
								<div className="font-medium border-b border-gray-700 pb-1">
									Company Details
								</div>
								<p>Registration: {company.inregistrare?.stare}</p>
								<p>Type: {company.tip_firma?.forma_juridica}</p>
								<p>Fiscal: {company.inregistrare?.organ_fiscal}</p>
							</div>
						}
					>
						<button
							className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
							onClick={(e) => {
								e.stopPropagation();
								navigate(`/companies/${company.cui}`);
							}}
						>
							<span>Details</span>
							<Info className="h-4 w-4" />
						</button>
					</Tooltip>
				</div>
			</td>
		</tr>
	);
};

