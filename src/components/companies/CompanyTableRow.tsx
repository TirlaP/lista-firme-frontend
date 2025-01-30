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

	// Get location data from either adresa or adresa_anaf
	const location = {
		judet:
			company.adresa?.judet ||
			company.adresa_anaf?.sediu_social?.sdenumire_Judet ||
			"",
		localitate:
			company.adresa?.localitate ||
			company.adresa_anaf?.sediu_social?.sdenumire_Localitate ||
			"",
	};

	// Get contact info
	const contactInfo = {
		telefon: company.contact?.telefon || company.date_generale?.telefon || "",
		email: company.contact?.email || company.date_generale?.email || "",
		website: company.contact?.website || company.date_generale?.website || "",
	};

	return (
		<tr
			className="hover:bg-gray-50 transition-colors cursor-pointer"
			onMouseEnter={() => onHover(company.denumire || company.nume)}
			onMouseLeave={() => onHover(null)}
			onClick={handleRowClick}
		>
			<td className="px-4 py-4">
				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium text-gray-900">
						{company.denumire || company.nume}
					</span>
					<span className="text-xs text-gray-500 line-clamp-2">
						{company.adresa_completa || company.date_generale?.adresa}
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
							{company.inregistrare?.numar || company.date_generale?.nrRegCom}
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
					<span className="text-sm text-gray-900">{location.judet}</span>
					<span className="text-xs text-gray-500">{location.localitate}</span>
				</div>
			</td>

			<td className="hidden xl:table-cell px-4 py-4">
				<div className="flex flex-col space-y-1">
					{contactInfo.telefon && (
						<a
							href={`tel:${contactInfo.telefon}`}
							className="text-sm text-blue-600 hover:text-blue-800"
							onClick={(e) => e.stopPropagation()}
						>
							{contactInfo.telefon}
						</a>
					)}
					{contactInfo.email && (
						<a
							href={`mailto:${contactInfo.email}`}
							className="text-sm text-blue-600 hover:text-blue-800"
							onClick={(e) => e.stopPropagation()}
						>
							{contactInfo.email}
						</a>
					)}
				</div>
			</td>

			<td className="px-4 py-4">
				<div className="flex items-center space-x-3">
					{contactInfo.website && (
						<a
							href={contactInfo.website}
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
								<p>
									Registration:{" "}
									{company.date_generale?.stare_inregistrare ||
										company.inregistrare?.stare}
								</p>
								<p>
									Type:{" "}
									{company.date_generale?.forma_juridica ||
										company.tip_firma?.forma_juridica}
								</p>
								<p>
									Fiscal:{" "}
									{company.date_generale?.organFiscalCompetent ||
										company.inregistrare?.organ_fiscal}
								</p>
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
