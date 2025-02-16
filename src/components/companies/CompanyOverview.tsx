import { Tooltip } from "@/components/ui/Tooltip";
import { Company } from "@/types/company.types";
import { AlertCircle, Book, Building, FileText, Info } from "lucide-react";

interface CompanyOverviewProps {
  company: Company;
}

export const CompanyOverview = ({ company }: CompanyOverviewProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-400" />
            General Information
          </h2>
          <Tooltip
            content={
              <div className="space-y-2 p-2">
                <div className="font-medium border-b border-gray-700 pb-1">
                  Registration Details
                </div>
                <div className="space-y-1 text-sm">
                  <p>Status: {company.inregistrare?.stare}</p>
                  <p>Authority: {company.inregistrare?.organ_fiscal}</p>
                  <p>TVA: {company.date_generale?.TVA ? "Yes" : "No"}</p>
                </div>
              </div>
            }
          >
            <AlertCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
          </Tooltip>
        </div>
      </div>

      {/* Registration Info */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-400" />
              Registration Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Number</p>
                <p className="text-sm">{company.inregistrare?.numar || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">
                  {company.inregistrare?.data
                    ? new Date(company.inregistrare.data).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Fiscal Code</p>
                <p className="text-sm">{company.cui}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Authority</p>
                <p className="text-sm">{company.inregistrare?.organ_fiscal || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Book className="h-4 w-4 text-gray-400" />
              Activity Details
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">CAEN Code</p>
                  {company.caen && (
                    <Tooltip
                      content={
                        <div className="space-y-2 p-2">
                          <p className="font-medium">{company.caen.name}</p>
                          <div className="text-xs space-y-1 text-gray-200">
                            <p>Division: {company.caen.division}</p>
                            <p>Section: {company.caen.section}</p>
                            {company.caen.description && (
                              <p>Details: {company.caen.description}</p>
                            )}
                          </div>
                        </div>
                      }
                    >
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </Tooltip>
                  )}
                </div>
                <p className="text-sm">{company.cod_CAEN}</p>
                <p className="text-xs text-gray-500">{company.caen?.name}</p>
              </div>

              <div className="pt-2 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Legal Form</p>
                  <p className="text-sm">{company.tip_firma?.forma_juridica || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Organization Type</p>
                  <p className="text-sm">{company.tip_firma?.forma_organizare || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {(company.date_generale?.capital_social || company.date_generale?.numar_angajati) && (
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {company.date_generale?.capital_social && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Social Capital</p>
                <p className="text-sm">
                  {new Intl.NumberFormat('ro-RO', {
                    style: 'currency',
                    currency: 'RON'
                  }).format(company.date_generale.capital_social)}
                </p>
              </div>
            )}
            {company.date_generale?.numar_angajati && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Employees</p>
                <p className="text-sm">{company.date_generale.numar_angajati}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};