import { Card } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

interface LatestCompaniesGridProps {
  timeRange: string;
  dateRange: { from: Date; to: Date };
}

export const LatestCompaniesGrid = ({
  timeRange,
  dateRange,
}: LatestCompaniesGridProps) => {
  // This will be replaced with real data fetching
  const companies = Array(12)
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Card
          key={company.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <Link to={`/firme/${company.cui}`} className="block">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    CUI: {company.cui}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  {company.registrationDate.toLocaleDateString()}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  {company.location}, {company.county}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                  {company.caen} - {company.caenDescription}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {company.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    {company.phone}
                  </div>
                )}

                {company.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    {company.email}
                  </div>
                )}

                {company.website && (
                  <div className="flex items-center text-sm text-gray-600">
                    <LinkIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    {company.website}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
