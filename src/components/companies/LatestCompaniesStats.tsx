import { BarChart } from "@/components/charts/BarChart";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Building2,
  Calendar,
  FileText,
  MapPin,
  TrendingUp,
} from "lucide-react";

/**
 * LatestCompaniesStats - Visual display of statistics for latest companies
 *
 * @param {object} props
 * @param {object} props.stats - Statistics data for the latest companies
 */
export const LatestCompaniesStats = ({ stats }) => {
  if (!stats) return null;

  // Format dates for display
  const formatDateRange = () => {
    if (!stats.dateRange) return "Recent period";

    const from = new Date(stats.dateRange.from);
    const to = new Date(stats.dateRange.to);

    return `${format(from, "dd MMM yyyy")} - ${format(to, "dd MMM yyyy")}`;
  };

  // Format number with locale
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return num.toLocaleString();
  };

  // Prepare data for CAEN chart
  const topCaenData =
    stats.topCAEN?.map((item) => ({
      name: item.code,
      value: item.count,
    })) || [];

  // Prepare data for location chart
  const topLocationsData =
    stats.topLocations?.map((item) => ({
      name: item.location || "Unknown",
      value: item.count,
    })) || [];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            New Companies Overview
          </h2>
          <div className="text-sm text-gray-500 flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDateRange()}
          </div>
        </div>

        {/* Stats summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium text-blue-800">
                  Total New Companies
                </h3>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {formatNumber(stats.totalNew)}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Building2 className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>

          {stats.topCAEN?.[0] && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-green-800">
                    Top CAEN Code
                  </h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">
                    {stats.topCAEN[0].code}
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    {formatNumber(stats.topCAEN[0].count)} companies
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          )}

          {stats.topLocations?.[0] && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-purple-800">
                    Top Location
                  </h3>
                  <p className="text-xl font-bold text-purple-900 mt-1 truncate max-w-[150px]">
                    {stats.topLocations[0].location || "Unknown"}
                  </p>
                  <p className="text-xs text-purple-700 mt-0.5">
                    {formatNumber(stats.topLocations[0].count)} companies
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
          )}

          {stats.dailyTrend?.[0] && (
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-orange-800">
                    Latest Day
                  </h3>
                  <p className="text-lg font-bold text-orange-900 mt-1">
                    {stats.dailyTrend[0].date
                      ? format(new Date(stats.dailyTrend[0].date), "dd MMM")
                      : "Today"}
                  </p>
                  <p className="text-xs text-orange-700 mt-0.5">
                    {formatNumber(stats.dailyTrend[0].count)} companies
                  </p>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCaenData.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Top CAEN Codes
              </h3>
              <div className="h-64">
                <BarChart
                  data={topCaenData}
                  indexBy="name"
                  keys={["value"]}
                  colors={["#3b82f6"]}
                  labelTextColor="#ffffff"
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Companies",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  padding={0.3}
                  borderRadius={4}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  enableLabel={false}
                  tooltip={({ data }) => (
                    <div className="bg-white p-2 shadow rounded border border-gray-200">
                      <div className="text-sm font-medium">{data.name}</div>
                      <div className="text-xs text-gray-500">
                        {data.value} companies
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          {topLocationsData.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Top Locations
              </h3>
              <div className="h-64">
                <BarChart
                  data={topLocationsData}
                  indexBy="name"
                  keys={["value"]}
                  colors={["#8b5cf6"]}
                  labelTextColor="#ffffff"
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Companies",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  padding={0.3}
                  borderRadius={4}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  enableLabel={false}
                  tooltip={({ data }) => (
                    <div className="bg-white p-2 shadow rounded border border-gray-200">
                      <div className="text-sm font-medium">{data.name}</div>
                      <div className="text-xs text-gray-500">
                        {data.value} companies
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
