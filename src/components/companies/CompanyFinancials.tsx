import { Company } from "@/types/company.types";
import { Badge } from "@/components/ui/Badge";
import { 
  Activity,
  AlertCircle,
  Building,
  Calendar,
  CircleDollarSign,
  FileText,
  Users
} from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface CompanyFinancialsProps {
  company: Company;
}

export const CompanyFinancials = ({ company }: CompanyFinancialsProps) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'activa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactiva':
      case 'radiata':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'suspendata':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount);
  };

  return (
    <div className="divide-y divide-gray-200">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" />
            Company Status & Financial Overview
          </h2>
          <Badge 
            variant="outline" 
            className={getStatusColor(company.inregistrare?.stare)}
          >
            {company.inregistrare?.stare || "N/A"}
          </Badge>
        </div>
      </div>

      {/* Status Information */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Registration Status */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-400" />
                Registration Status
              </h3>
              <Tooltip
                content={
                  <div className="space-y-1 p-2">
                    <p>Last updated: {company.inregistrare?.data_actualizare}</p>
                    <p>Source: {company.inregistrare?.sursa || "ANAF"}</p>
                  </div>
                }
              >
                <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(company.inregistrare?.stare)}
                >
                  {company.inregistrare?.stare || "N/A"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Registration Date</span>
                <span className="font-medium">
                  {company.inregistrare?.data
                    ? new Date(company.inregistrare.data).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Authority</span>
                <span className="font-medium">
                  {company.inregistrare?.organ_fiscal || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-gray-400" />
                Financial Overview
              </h3>
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Social Capital</span>
                <span className="font-medium">
                  {company.date_generale?.capital_social
                    ? formatCurrency(company.date_generale.capital_social)
                    : "N/A"}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">TVA Registration</span>
                <Badge 
                  variant="outline" 
                  className={company.date_generale?.TVA 
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                  }
                >
                  {company.date_generale?.TVA ? "Yes" : "No"}
                </Badge>
              </div>
              
              {company.date_generale?.cifra_afaceri && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Annual Revenue</span>
                  <span className="font-medium">
                    {formatCurrency(company.date_generale.cifra_afaceri)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Employee Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                Employee Information
              </h3>
              <FileText className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Employees</span>
                <span className="font-medium">
                  {company.date_generale?.numar_angajati || "N/A"}
                </span>
              </div>
              
              {company.date_generale?.numar_sucursale && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Branch Offices</span>
                  <span className="font-medium">
                    {company.date_generale.numar_sucursale}
                  </span>
                </div>
              )}
              
              {company.date_generale?.numar_puncte_lucru && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Working Points</span>
                  <span className="font-medium">
                    {company.date_generale.numar_puncte_lucru}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {company.date_generale?.observatii && (
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-yellow-800">Additional Notes</h4>
                <p className="text-sm text-yellow-700">{company.date_generale.observatii}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};