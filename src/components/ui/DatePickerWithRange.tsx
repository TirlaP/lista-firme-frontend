import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/utils/cn";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

/**
 * DatePickerWithRange - A date range picker component
 *
 * @param {object} props
 * @param {DateRange | undefined} props.value - The current date range value
 * @param {(date: DateRange) => void} props.onChange - Function called when date range changes
 * @param {string} [props.className] - Additional CSS classes
 */
export function DatePickerWithRange({ value, onChange, className }) {
  const [date, setDate] = React.useState(value);

  // Update internal state when external value changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Handle date selection
  const handleSelect = (newDate) => {
    setDate(newDate);
    if (onChange && newDate?.from && newDate?.to) {
      onChange(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-gray-500",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="p-3 border-t border-gray-100">
            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Today
                  const today = new Date();
                  const newDate = {
                    from: today,
                    to: today,
                  };
                  setDate(newDate);
                  onChange?.(newDate);
                }}
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Last 7 days
                  const today = new Date();
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(today.getDate() - 6);
                  const newDate = {
                    from: sevenDaysAgo,
                    to: today,
                  };
                  setDate(newDate);
                  onChange?.(newDate);
                }}
              >
                Last 7 days
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Last 30 days
                  const today = new Date();
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(today.getDate() - 29);
                  const newDate = {
                    from: thirtyDaysAgo,
                    to: today,
                  };
                  setDate(newDate);
                  onChange?.(newDate);
                }}
              >
                Last 30 days
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
