import { Tooltip } from "@/components/ui/Tooltip";
import { Badge } from "@/components/ui/Badge";
import { Company } from "@/types/company.types";
import { Building2, Globe, Info, Mail, MapPin, Phone } from "lucide-react";
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

  const location = {
    judet: company.adresa?.judet || company.adresa_anaf?.sediu_social?.sdenumire_Judet || "",
    localitate: company.adresa?.localitate || company.adresa_anaf?.sediu_social?.sdenumire_Localitate || "",
  };

  const contactInfo = {
    telefon: company.contact?.telefon || company.date_generale?.telefon || "",
    email: company.contact?.email || company.date_generale?.email || "",
    website: company.contact?.website || company.date_generale?.website || "",
  };

  const status = company.inregistrare?.stare || company.date_generale?.stare_inregistrare;
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'activa':
        return 'bg-green-100 text-green-800';
      case 'inactiva':
      case 'radiata':
        return 'bg-red-100 text-red-800';
      case 'suspendata':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr
      className="group hover:bg-gray-50/80 transition-colors cursor-pointer border-b border-gray-200"
      onMouseEnter={() => onHover(company.denumire)}
      onMouseLeave={() => onHover(null)}
      onClick={handleRowClick}
    >
      <td className="px-4 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-900">
                {company.denumire}
              </span>
            </div>
            <Badge variant="outline" className={`ml-2 ${getStatusColor(status)}`}>
              {status || 'N/A'}
            </Badge>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 line-clamp-2">
                {company.adresa_completa || company.date_generale?.adresa}
              </span>
              <span className="text-xs text-gray-500">
                {location.localitate}, {location.judet}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">CUI: {company.cui}</span>
            <span className="text-gray-400">|</span>
            <Tooltip
              content={
                <div className="space-y-1 p-2">
                  <p className="font-medium text-sm">{company.caen?.name}</p>
                  <div className="text-xs space-y-1 text-gray-200">
                    <p>Division: {company.caen?.division}</p>
                    <p>Section: {company.caen?.section}</p>
                  </div>
                </div>
              }
            >
              <div className="flex items-center space-x-1 cursor-help">
                <span className="text-sm">CAEN: {company.cod_CAEN}</span>
                <Info className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </Tooltip>
          </div>
          <span className="text-xs text-gray-500">
            {company.inregistrare?.numar || company.date_generale?.nrRegCom}
          </span>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex flex-col space-y-2">
          {contactInfo.telefon && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a
                href={`tel:${contactInfo.telefon}`}
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                {contactInfo.telefon}
              </a>
            </div>
          )}
          {contactInfo.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                {contactInfo.email}
              </a>
            </div>
          )}
          {contactInfo.website && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                {contactInfo.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-end space-x-4">
          <Tooltip
            content={
              <div className="space-y-2 p-2">
                <div className="font-medium border-b border-gray-700 pb-1">
                  Company Details
                </div>
                <div className="space-y-1 text-sm">
                  <p>Status: {company.date_generale?.stare_inregistrare || company.inregistrare?.stare}</p>
                  <p>Type: {company.date_generale?.forma_juridica || company.tip_firma?.forma_juridica}</p>
                  <p>Fiscal: {company.date_generale?.organFiscalCompetent || company.inregistrare?.organ_fiscal}</p>
                </div>
              </div>
            }
          >
            <button
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 bg-gray-50 px-3 py-1.5 rounded-md transition-colors group-hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/companies/${company.cui}`);
              }}
            >
              <span>View Details</span>
              <Info className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};