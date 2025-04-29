import { Card } from "@/components/ui/card";
import { BarChart, Building2, Check, Globe, Phone } from "lucide-react";

/**
 * CompanyStats - Display overall company statistics as cards
 */
export const CompanyStats = ({ stats, isLoading }) => {
  // Define stat cards configuration
  const statCards = [
    {
      title: "Total Companies",
      value: stats?.totalCompanies,
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Companies",
      value: stats?.activeCompanies,
      icon: Check,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "With Website",
      value: stats?.withWebsite,
      icon: Globe,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      title: "With Contact",
      value: stats?.withContact,
      icon: Phone,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  // Format number with locale
  const formatNumber = (num) => {
    return num?.toLocaleString() || "0";
  };

  // Calculate percentage based on total
  const getPercentage = (value) => {
    if (!stats?.totalCompanies || !value) return "0%";
    return `${((value / stats.totalCompanies) * 100).toFixed(1)}%`;
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {statCards.map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="ml-4 space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-7 bg-gray-200 rounded animate-pulse w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statCards.map((card, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <div className="flex items-baseline mt-1">
                <p className="text-2xl font-semibold text-gray-900">
                  {formatNumber(card.value)}
                </p>
                {index > 0 && (
                  <p className="ml-2 text-xs text-gray-500">
                    {getPercentage(card.value)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};