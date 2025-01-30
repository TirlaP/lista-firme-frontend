import {
	Building2,
	Calendar,
	Link as LinkIcon,
	Mail,
	MapPin,
	Phone,
	Table,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/Table";

interface LatestCompaniesListProps {
	timeRange: string;
	dateRange: { from: Date; to: Date };
}

export const LatestCompaniesList = ({
	timeRange,
	dateRange,
}: LatestCompaniesListProps) => {
	// This will be replaced with real data fetching
	const companies = Array(10)
		.fill(null)
		.map((_, i) => ({
			id: i,
			cui: 1234567 + i,
			name: `Company ${i + 1} SRL`,
			registrationDate: new Date(2024, 11, 11 - i),
			location: "București",
			county: "Sector 1",
			caen: "6201",
			caenDescription: "Computer programming activities",
			phone: "+40722123456",
			email: "contact@company.com",
			website: "www.company.com",
		}));

	return (
		<div className="bg-white rounded-lg border border-gray-200">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Company Info</TableHead>
						<TableHead>Registration</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Activity</TableHead>
						<TableHead>Contact</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{companies.map((company) => (
						<TableRow key={company.id}>
							<TableCell className="min-w-[200px]">
								<Link
									to={`/companies/${company.cui}`}
									className="hover:text-blue-600 transition-colors"
								>
									<div>
										<span className="font-medium">{company.name}</span>
										<div className="text-sm text-gray-500 mt-1">
											CUI: {company.cui}
										</div>
									</div>
								</Link>
							</TableCell>

							<TableCell>
								<div className="flex items-center text-sm">
									<Calendar className="h-4 w-4 mr-2 text-gray-500" />
									{company.registrationDate.toLocaleDateString()}
								</div>
							</TableCell>

							<TableCell>
								<div className="flex items-center text-sm">
									<MapPin className="h-4 w-4 mr-2 text-gray-500" />
									{
										company.location
									}, {company.county}
								</div>
							</TableCell>

							<TableCell>
								<div className="flex items-center text-sm">
									<Building2 className="h-4 w-4 mr-2 text-gray-500" />
									<span>
										{company.caen}
										<span className="text-gray-500 ml-1">
											- {company.caenDescription}
										</span>
									</span>
								</div>
							</TableCell>

							<TableCell>
								<div className="space-y-1">
									{company.phone && (
										<div className="flex items-center text-sm">
											<Phone className="h-4 w-4 mr-2 text-gray-500" />
											{company.phone}
										</div>
									)}

									{company.email && (
										<div className="flex items-center text-sm">
											<Mail className="h-4 w-4 mr-2 text-gray-500" />
											{company.email}
										</div>
									)}

									{company.website && (
										<div className="flex items-center text-sm">
											<LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
											{company.website}
										</div>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

