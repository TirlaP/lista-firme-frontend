// src/components/companies/CompanyContact.tsx
import { Company } from "@/types/company.types";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

interface CompanyContactProps {
	company: Company;
}

export const CompanyContact = ({ company }: CompanyContactProps) => {
	return (
		<div className="p-6 space-y-6">
			<h2 className="text-lg font-semibold text-gray-900">
				Contact Information
			</h2>

			<div className="space-y-4">
				{/* Contact Methods */}
				{company.contact.telefon && (
					<div className="flex items-center gap-2">
						<Phone className="h-4 w-4 text-gray-400" />
						<a
							href={`tel:${company.contact.telefon}`}
							className="text-sm text-blue-600 hover:text-blue-800"
						>
							{company.contact.telefon}
						</a>
					</div>
				)}

				{company.contact.email && (
					<div className="flex items-center gap-2">
						<Mail className="h-4 w-4 text-gray-400" />
						<a
							href={`mailto:${company.contact.email}`}
							className="text-sm text-blue-600 hover:text-blue-800"
						>
							{company.contact.email}
						</a>
					</div>
				)}

				{company.contact.website && (
					<div className="flex items-center gap-2">
						<Globe className="h-4 w-4 text-gray-400" />
						<a
							href={company.contact.website}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-600 hover:text-blue-800"
						>
							{company.contact.website.replace(/^https?:\/\//, "")}
						</a>
					</div>
				)}

				{company.contact.fax && (
					<div className="flex items-center gap-2">
						<Phone className="h-4 w-4 text-gray-400" />
						<span className="text-sm text-gray-500">
							Fax: {company.contact.fax}
						</span>
					</div>
				)}
			</div>

			{/* Address */}
			<div className="border-t border-gray-200 pt-4">
				<div className="flex items-center gap-2 mb-2">
					<MapPin className="h-4 w-4 text-gray-400" />
					<h3 className="text-sm font-medium text-gray-900">Address</h3>
				</div>
				<address className="text-sm not-italic space-y-1 text-gray-500">
					<p>
						{company.adresa.strada} {company.adresa.numar}
					</p>
					<p>
						{company.adresa.localitate}, {company.adresa.judet}
					</p>
					<p>{company.adresa.cod_postal}</p>
					{company.adresa.detalii && (
						<p className="text-xs">{company.adresa.detalii}</p>
					)}
				</address>
			</div>
		</div>
	);
};
