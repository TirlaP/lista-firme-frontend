import { cn } from "@/utils/cn";
import { Building2, Calendar, ListFilter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CompanyFilters } from "../companies/CompanyFilters";
import { LatestCompaniesFilters } from "../companies/LatestCompaniesFilters";

const NavLink = ({
	to,
	icon: Icon,
	children,
	exact = false,
}: {
	to: string;
	icon: React.ElementType;
	children: React.ReactNode;
	exact?: boolean;
}) => {
	const location = useLocation();
	const isActive = exact
		? location.pathname === to
		: location.pathname.startsWith(to);

	return (
		<Link
			to={to}
			className={cn(
				"flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
				isActive
					? "bg-blue-50 text-blue-700"
					: "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
			)}
		>
			<Icon className="h-4 w-4 mr-3 flex-shrink-0" />
			{children}
		</Link>
	);
};

export const Sidebar = () => {
	const location = useLocation();
	const showFilters = location.pathname === "/companies";
	const showLatestFilters = location.pathname === "/companies/latest";

	return (
		<div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
			<div className="p-6">
				<nav className="space-y-1 mb-6">
					<NavLink to="/companies" icon={Building2} exact>
						All Companies
					</NavLink>
					<NavLink to="/companies/latest" icon={Calendar}>
						Latest Companies
					</NavLink>
				</nav>

				{showFilters && (
					<>
						<div className="flex items-center gap-2 mb-4">
							<ListFilter className="h-5 w-5 text-gray-500" />
							<h2 className="text-lg font-semibold text-gray-900">Filters</h2>
						</div>
						<CompanyFilters />
					</>
				)}

				{showLatestFilters && (
					<>
						<div className="flex items-center gap-2 mb-4">
							<Calendar className="h-5 w-5 text-gray-500" />
							<h2 className="text-lg font-semibold text-gray-900">
								Time Range
							</h2>
						</div>
						<LatestCompaniesFilters />
					</>
				)}
			</div>
		</div>
	);
};
