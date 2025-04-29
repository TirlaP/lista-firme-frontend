import { LineChart } from "@/components/charts/LineChart";
import { Card } from "@/components/ui/card";
import { format, isValid, parseISO } from "date-fns";
import { ArrowDown, ArrowUp, Calendar, Minus, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * LatestCompaniesTrends - Displays trend data for latest companies
 *
 * @param {object} props
 * @param {Array} props.data - Array of daily trend data with date and count
 */
export const LatestCompaniesTrends = ({ data = [] }) => {
  const [timespan, setTimespan] = useState("all");

  // Format and prepare data for chart
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Handle data slicing based on timespan
    let trendsData = [...data];

    if (timespan === "last3days" && trendsData.length > 3) {
      trendsData = trendsData.slice(0, 3);
    } else if (timespan === "last5days" && trendsData.length > 5) {
      trendsData = trendsData.slice(0, 5);
    }

    // Sort data by date (oldest first for the chart)
    trendsData.sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : null;
      const dateB = b.date ? new Date(b.date) : null;

      if (!dateA || !isValid(dateA)) return 1;
      if (!dateB || !isValid(dateB)) return -1;

      return dateA.getTime() - dateB.getTime();
    });

    // Format data for chart
    return trendsData.map((item) => {
      // Parse date safely
      let formattedDate = "Unknown";
      try {
        if (item.date) {
          const date = parseISO(item.date);
          if (isValid(date)) {
            formattedDate = format(date, "dd MMM");
          }
        }
      } catch (e) {
        console.error("Date parsing error:", e);
      }

      return {
        x: formattedDate,
        y: item.count || 0,
      };
    });
  }, [data, timespan]);

  // Calculate trend percentage from first to last day
  const trendPercentage = useMemo(() => {
    if (!chartData || chartData.length < 2)
      return { value: 0, direction: "neutral" };

    const firstDay = chartData[0]?.y || 0;
    const lastDay = chartData[chartData.length - 1]?.y || 0;

    if (firstDay === 0) return { value: 0, direction: "neutral" };

    const percentage = ((lastDay - firstDay) / firstDay) * 100;

    return {
      value: Math.abs(percentage.toFixed(1)),
      direction: percentage > 0 ? "up" : percentage < 0 ? "down" : "neutral",
    };
  }, [chartData]);

  // Early return if no data
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              Registration Trends
            </h2>
          </div>

          <div className="flex text-sm">
            <button
              className={`px-3 py-1 rounded-l-md ${
                timespan === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setTimespan("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 ${
                timespan === "last5days"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setTimespan("last5days")}
            >
              5 Days
            </button>
            <button
              className={`px-3 py-1 rounded-r-md ${
                timespan === "last3days"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setTimespan("last3days")}
            >
              3 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Stats summary */}
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700">
                  Daily Average
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    chartData.reduce((sum, item) => sum + item.y, 0) /
                      chartData.length,
                  ).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">companies per day</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-700">
                  Overall Trend
                </h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center gap-2">
                  {trendPercentage.direction === "up" ? (
                    <ArrowUp className="h-5 w-5 text-green-500" />
                  ) : trendPercentage.direction === "down" ? (
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  ) : (
                    <Minus className="h-5 w-5 text-gray-400" />
                  )}

                  <p
                    className={`text-xl font-bold ${
                      trendPercentage.direction === "up"
                        ? "text-green-600"
                        : trendPercentage.direction === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {trendPercentage.value}%
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {trendPercentage.direction === "up"
                    ? "increase"
                    : trendPercentage.direction === "down"
                      ? "decrease"
                      : "no change"}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="md:col-span-3">
            <div className="h-64">
              {chartData.length > 0 ? (
                <LineChart
                  data={[
                    {
                      id: "companies",
                      color: "hsl(221, 83%, 53%)",
                      data: chartData,
                    },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                  }}
                  curve="monotoneX"
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Date",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Companies",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  enableGridX={false}
                  enablePoints={true}
                  pointSize={8}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  enableArea={true}
                  areaOpacity={0.15}
                  useMesh={true}
                  enableSlices="x"
                  crosshairType="x"
                  tooltip={({ slice }) => (
                    <div className="bg-white p-2 shadow rounded border border-gray-200">
                      <div className="text-sm font-medium">
                        {slice.points[0].data.x}
                      </div>
                      <div className="text-xs text-gray-500">
                        {slice.points[0].data.y} companies
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No trend data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
