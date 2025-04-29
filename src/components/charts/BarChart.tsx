import { ResponsiveBar } from "@nivo/bar";
import React from "react";

/**
 * BarChart - A responsive bar chart component using Nivo
 *
 * @param {object} props - All properties are passed directly to Nivo's ResponsiveBar
 * @param {Array} props.data - The chart data
 * @param {string} props.indexBy - Data property used as index
 * @param {Array} props.keys - Keys used for the bars
 * @param {Array} props.colors - Bar colors
 */
export const BarChart = (props) => {
  // Default theme to ensure consistent styling
  const defaultTheme = {
    axis: {
      ticks: {
        text: {
          fontSize: 12,
          fill: "#6b7280",
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: "#4b5563",
        },
      },
    },
    grid: {
      line: {
        stroke: "#e5e7eb",
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fontSize: 12,
        fill: "#4b5563",
      },
    },
    tooltip: {
      container: {
        background: "#ffffff",
        fontSize: 12,
        borderRadius: 4,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        padding: "8px 12px",
      },
    },
  };

  // Default props
  const defaultProps = {
    margin: { top: 30, right: 30, bottom: 50, left: 60 },
    padding: 0.3,
    valueScale: { type: "linear" },
    indexScale: { type: "band", round: true },
    enableGridX: false,
    enableGridY: true,
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    role: "application",
    theme: defaultTheme,
    // Custom tooltip placeholder
    tooltip: ({ id, value, color, indexValue }) => (
      <div className="bg-white p-2 shadow rounded border border-gray-200">
        <div className="text-sm font-medium">{indexValue}</div>
        <div className="text-xs text-gray-500">
          {value} {id}
        </div>
      </div>
    ),
  };

  // If no data or empty array, show a placeholder
  if (!props.data || props.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-md border border-gray-200">
        <span className="text-gray-500 text-sm">No data available</span>
      </div>
    );
  }

  return <ResponsiveBar {...defaultProps} {...props} />;
};
