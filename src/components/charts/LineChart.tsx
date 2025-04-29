import { ResponsiveLine } from "@nivo/line";
import React from "react";

/**
 * LineChart - A responsive line chart component using Nivo
 *
 * @param {object} props - All properties are passed directly to Nivo's ResponsiveLine
 * @param {Array} props.data - The chart data
 */
export const LineChart = (props) => {
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
    crosshair: {
      line: {
        stroke: "#374151",
        strokeWidth: 1,
        strokeOpacity: 0.35,
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
    xScale: { type: "point" },
    yScale: {
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Date",
      legendOffset: 36,
      legendPosition: "middle",
      truncateTickAt: 0,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Value",
      legendOffset: -40,
      legendPosition: "middle",
      truncateTickAt: 0,
    },
    enableGridX: false,
    enableGridY: true,
    colors: { scheme: "category10" },
    lineWidth: 3,
    pointSize: 8,
    pointColor: { theme: "background" },
    pointBorderWidth: 2,
    pointBorderColor: { from: "serieColor" },
    pointLabelYOffset: -12,
    enableCrosshair: true,
    useMesh: true,
    legends: [],
    theme: defaultTheme,
    animate: true,
    motionConfig: "gentle",
    // Default tooltip
    tooltip: ({ point }) => (
      <div className="bg-white p-2 shadow rounded border border-gray-200">
        <div className="text-sm font-medium">{point.data.x}</div>
        <div className="text-xs text-gray-500">{point.data.y}</div>
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

  return <ResponsiveLine {...defaultProps} {...props} />;
};
