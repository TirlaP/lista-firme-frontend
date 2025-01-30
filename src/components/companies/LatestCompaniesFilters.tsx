import { useLatestCompaniesStore } from "@/store/latestCompaniesStore";
import { format } from "date-fns";
import { DateRangeSelector } from "../ui/DateRangeSelector";

export const LatestCompaniesFilters = () => {
	const { filters, setFilter, resetFilters } = useLatestCompaniesStore();

	const handleDateRangeChange = (range) => {
		// When setting custom dates, clear the timeRange
		setFilter("timeRange", undefined);

		if (range.from) {
			setFilter("customStartDate", format(range.from, "yyyy-MM-dd"));
		}
		if (range.to) {
			setFilter("customEndDate", format(range.to, "yyyy-MM-dd"));
		}
	};

	const handlePresetChange = (preset) => {
		// When using a preset, clear the custom dates
		setFilter("timeRange", preset);
		setFilter("customStartDate", undefined);
		setFilter("customEndDate", undefined);
	};

	const currentRange = {
		from: filters.customStartDate
			? new Date(filters.customStartDate)
			: undefined,
		to: filters.customEndDate ? new Date(filters.customEndDate) : undefined,
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h3 className="text-sm font-medium text-gray-900">Date Range</h3>
				<DateRangeSelector
					value={currentRange}
					onChange={handleDateRangeChange}
					onPresetChange={handlePresetChange}
				/>
			</div>

			{Object.keys(filters).some(
				(key) => filters[key] !== undefined && key !== "page" && key !== "limit"
			) && (
				<button
					onClick={resetFilters}
					className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
				>
					Reset Filters
				</button>
			)}
		</div>
	);
};

