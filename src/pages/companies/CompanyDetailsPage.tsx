import { CompanyContact } from "@/components/companies/CompanyContact";
import { CompanyFinancials } from "@/components/companies/CompanyFinancials";
import { CompanyOverview } from "@/components/companies/CompanyOverview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { ArrowLeft, Building2, Calendar, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const CompanyDetailsPage = () => {
  const { cui } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading } = useCompanyDetails(cui!);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 lg:col-span-2" />
            <Skeleton className="h-96" />
            <Skeleton className="h-64 lg:col-span-3" />
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Company not found
        </h2>
        <Button onClick={() => navigate("/companies")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
      </div>
    );
  }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate("/companies")}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Companies
        </Button>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-900">{company.nume}</h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    getStatusColor(company.inregistrare?.stare)
                  }`}
                >
                  {company.inregistrare?.stare || "N/A"}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {company.inregistrare?.data
                    ? new Date(company.inregistrare.data).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="text-sm text-gray-500">CUI: {company.cui}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{company.adresa_completa || company.date_generale?.adresa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CompanyOverview company={company} />
          </Card>

          {/* Contact */}
          <Card className="overflow-hidden">
            <CompanyContact company={company} />
          </Card>

          {/* Financials */}
          <Card className="lg:col-span-3 overflow-hidden">
            <CompanyFinancials company={company} />
          </Card>
        </div>
      </div>
    </div>
  );
};