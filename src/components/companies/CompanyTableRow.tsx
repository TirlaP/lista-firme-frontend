import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Company } from "@/types/company.types";
import { cn } from "@/utils/cn";
import {
  Building2,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  Info,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Props for the CompanyTableRow component
 * @typedef {Object} CompanyTableRowProps
 * @property {Company} company - Company data to display
 * @property {boolean} isHovered - Whether the row is currently hovered
 * @property {function} onHover - Function to call when hover state changes
 */

/**
 * CompanyTableRow - A responsive table row for displaying company information
 */
export const CompanyTableRow = ({ company, isHovered, onHover }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Handle navigation to company details
  const handleRowClick = (e) => {
    e.preventDefault();
    navigate(`/firme/${company.cui}`);
  };

  // Extract location information
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

  // Extract contact information
  const contactInfo = {
    telefon: company.contact?.telefon || company.date_generale?.telefon || "",
    email: company.contact?.email || company.date_generale?.email || "",
    website: company.contact?.website || company.date_generale?.website || "",
  };

  // Determine color based on status
  const status =
    company.inregistrare?.stare || company.date_generale?.stare_inregistrare;
  const getStatusColor = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower.includes("activ")) return "bg-green-100 text-green-800";
    if (statusLower.includes("inactiv") || statusLower.includes("radiat"))
      return "bg-red-100 text-red-800";
    if (statusLower.includes("suspend")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  // Get website domain for display
  const formatWebsite = (url) => {
    if (!url) return "";
    try {
      const domain = url.replace(/^https?:\/\//, "").split("/")[0];
      return domain;
    } catch (e) {
      return url;
    }
  };

  // Format the registration date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <tr
      className={cn(
        "group transition-colors cursor-pointer border-b border-gray-200",
        isHovered ? "bg-blue-50/60" : "hover:bg-gray-50/80",
      )}
      onMouseEnter={() => onHover(company.denumire)}
      onMouseLeave={() => onHover(null)}
      onClick={handleRowClick}
    >
      {/* Company Info Column */}
      <td className="px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="hidden sm:block flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
            {!imageError ? (
              <img
                src={`https://logo.clearbit.com/${formatWebsite(contactInfo.website)}`}
                alt=""
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium text-gray-900 truncate max-w-[250px] md:max-w-sm">
                  {company.denumire}
                </h3>
                <div className="flex items-center mt-0.5 gap-x-2 flex-wrap">
                  <span className="text-xs text-gray-500">
                    CUI: {company.cui}
                  </span>
                  {company.cod_CAEN && (
                    <Tooltip
                      content={
                        <div className="space-y-1 p-2">
                          <p className="font-medium text-sm">
                            {company.caen?.name}
                          </p>
                          <div className="text-xs space-y-1 text-gray-200">
                            <p>Division: {company.caen?.division}</p>
                            <p>Section: {company.caen?.section}</p>
                          </div>
                        </div>
                      }
                    >
                      <span className="text-xs text-gray-500 flex items-center">
                        CAEN: {company.cod_CAEN}
                        <Info className="h-3 w-3 ml-0.5 text-gray-400" />
                      </span>
                    </Tooltip>
                  )}
                </div>
              </div>

              <Badge
                className={`${getStatusColor(status)} text-xs whitespace-nowrap`}
              >
                {status || "N/A"}
              </Badge>
            </div>

            {/* Location information */}
            <div className="mt-2 flex items-start text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5 mr-1" />
              <span className="truncate">
                {location.localitate && location.judet
                  ? `${location.localitate}, ${location.judet}`
                  : company.adresa_completa ||
                    company.date_generale?.adresa ||
                    "No address"}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Registration Info Column - Hidden on Mobile */}
      <td className="hidden md:table-cell px-4 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5 text-gray-400 mr-2" />
            {formatDate(
              company.inregistrare?.data ||
                company.date_generale?.data_inregistrare,
            )}
          </div>

          <div className="text-xs text-gray-600">
            {company.inregistrare?.numar ||
              company.date_generale?.nrRegCom ||
              "No registration number"}
          </div>
        </div>
      </td>

      {/* Contact Info Column - Hidden on Mobile and Tablet */}
      <td className="hidden lg:table-cell px-4 py-4">
        <div className="flex flex-col space-y-1.5">
          {contactInfo.telefon && (
            <div className="flex items-center">
              <Phone className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a
                href={`tel:${contactInfo.telefon}`}
                className="text-xs text-blue-600 hover:text-blue-800 truncate max-w-[180px]"
                onClick={(e) => e.stopPropagation()}
              >
                {contactInfo.telefon}
              </a>
            </div>
          )}

          {contactInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-xs text-blue-600 hover:text-blue-800 truncate max-w-[180px]"
                onClick={(e) => e.stopPropagation()}
              >
                {contactInfo.email}
              </a>
            </div>
          )}

          {contactInfo.website && (
            <div className="flex items-center">
              <Globe className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <a
                href={
                  contactInfo.website.startsWith("http")
                    ? contactInfo.website
                    : `https://${contactInfo.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 truncate max-w-[180px]"
                onClick={(e) => e.stopPropagation()}
              >
                {formatWebsite(contactInfo.website)}
              </a>
            </div>
          )}

          {!contactInfo.telefon &&
            !contactInfo.email &&
            !contactInfo.website && (
              <span className="text-xs text-gray-500">
                No contact information
              </span>
            )}
        </div>
      </td>

      {/* Actions Column */}
      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end">
          {/* Mobile action button - only visible on smaller screens */}
          <Button
            onClick={handleRowClick}
            size="sm"
            variant="ghost"
            className="p-1 sm:hidden"
          >
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          {/* Desktop action button */}
          <Button
            onClick={handleRowClick}
            size="sm"
            variant="outline"
            className="hidden sm:flex items-center space-x-1 text-xs"
          >
            <span>Details</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
