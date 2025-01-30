import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/utils/cn";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const staticRanges = [
	{
		label: "Today",
		range: () => ({
			startDate: new Date(),
			endDate: new Date(),
		}),
	},
	{
		label: "Yesterday",
		range: () => ({
			startDate: addDays(new Date(), -1),
			endDate: addDays(new Date(), -1),
		}),
	},
	{
		label: "Last 7 Days",
		range: () => ({
			startDate: addDays(new Date(), -7),
			endDate: new Date(),
		}),
	},
	{
		label: "Last 30 Days",
		range: () => ({
			startDate: addDays(new Date(), -30),
			endDate: new Date(),
		}),
	},
];

export function DateRangeSelector({ value, onChange, onPresetChange }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPreset, setSelectedPreset] = useState("");

	const formatDateRange = (from, to) => {
		if (!from || !to) return "Select date range";
		if (format(from, "PP") === format(to, "PP")) {
			return format(from, "PP");
		}
		return `${format(from, "PP")} - ${format(to, "PP")}`;
	};

	const handleRangeChange = (ranges) => {
		const range = ranges.selection;
		onChange({
			from: range.startDate,
			to: range.endDate,
		});
		setSelectedPreset("");
	};

	const handlePresetClick = (preset) => {
		const range = preset.range();
		onChange({
			from: range.startDate,
			to: range.endDate,
		});
		setSelectedPreset(preset.label);
		onPresetChange?.(preset.label.toLowerCase().replace(/\s+/g, ""));
		setIsOpen(false);
	};

	const selectionRange = {
		startDate: value.from || new Date(),
		endDate: value.to || new Date(),
		key: "selection",
	};

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}
			align="start"
			className="w-auto"
			trigger={
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start gap-2 text-left font-normal",
						!value.from && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="h-4 w-4" />
					<span className="flex-1">
						{formatDateRange(value.from, value.to)}
					</span>
				</Button>
			}
			content={
				<div className="flex w-auto gap-4 p-3">
					<div className="w-48 flex flex-col">
						<h3 className="mb-2 px-2 text-sm font-medium text-gray-500">
							Quick Select
						</h3>
						<div className="space-y-1">
							{staticRanges.map((preset) => (
								<button
									key={preset.label}
									onClick={() => handlePresetClick(preset)}
									className={cn(
										"w-full px-2 py-1.5 text-sm text-left rounded-md transition-colors hover:bg-gray-100",
										selectedPreset === preset.label &&
											"bg-blue-50 text-blue-600"
									)}
								>
									{preset.label}
								</button>
							))}
						</div>
						<div className="my-4 border-t" />
						<span className="px-2 text-xs text-gray-500">
							Or select custom range
						</span>
					</div>

					<div className="border-l" />

					<div>
						<DateRange
							ranges={[selectionRange]}
							onChange={handleRangeChange}
							months={2}
							direction="horizontal"
							preventSnapRefocus={true}
							showDateDisplay={false}
							minDate={addDays(new Date(), -365)}
							maxDate={new Date()}
							rangeColors={["#0ea5e9"]}
						/>
					</div>
				</div>
			}
		/>
	);
}

