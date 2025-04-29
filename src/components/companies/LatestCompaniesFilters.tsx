import {
  latestCompanyFiltersAtom,
  resetLatestCompanyFiltersAtom,
  setLatestCompanyFilterAtom,
} from "@/atoms/latest-companies";
import { TimeRange } from "@/graphql/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/utils/cn";
import { 
  format, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  subMonths,
  isEqual,
  isSameDay
} from "date-fns";
import { ro } from "date-fns/locale";
import { useAtomValue, useSetAtom } from "jotai";
import { Calendar, CalendarRange, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export const LatestCompaniesFilters = () => {
  const filters = useAtomValue(latestCompanyFiltersAtom);
  const setFilter = useSetAtom(setLatestCompanyFilterAtom);
  const resetFilters = useSetAtom(resetLatestCompanyFiltersAtom);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Track active buttons with local state
  const [activeButton, setActiveButton] = useState(filters.timeRange || null);

  // Date objects for calendar
  const fromDate = filters.customStartDate ? new Date(filters.customStartDate) : undefined;
  const toDate = filters.customEndDate ? new Date(filters.customEndDate) : undefined;
  const dateRange = { from: fromDate, to: toDate };

  // Update both timeRange and date range at once
  const handlePresetChange = (preset, startDate, endDate) => {
    // Update active button state
    setActiveButton(preset);
    
    // For unsupported enum values, don't set timeRange in filters
    if (preset === "THISMONTH" || preset === "LASTMONTH") {
      setFilter({ key: "timeRange", value: undefined });
    } else {
      setFilter({ key: "timeRange", value: preset });
    }
    
    // Always set the date range
    setFilter({ key: "customStartDate", value: format(startDate, "yyyy-MM-dd") });
    setFilter({ key: "customEndDate", value: format(endDate, "yyyy-MM-dd") });
    setCalendarOpen(false);
  };

  // Handle custom date selection
  const handleDateRangeChange = (range) => {
    // Clear active button when using custom date range
    setActiveButton(null);
    setFilter({ key: "timeRange", value: undefined });
    
    if (range.from) {
      setFilter({ key: "customStartDate", value: format(range.from, "yyyy-MM-dd") });
      setFilter({ 
        key: "customEndDate", 
        value: range.to ? format(range.to, "yyyy-MM-dd") : format(range.from, "yyyy-MM-dd")
      });
    }
  };

  // Get display text for current selection
  const getDisplayText = () => {
    if (fromDate && toDate) {
      return `${format(fromDate, "dd MMM yyyy", { locale: ro })} - ${format(toDate, "dd MMM yyyy", { locale: ro })}`;
    }
    
    const labels = {
      [TimeRange.TODAY]: "Astăzi",
      [TimeRange.YESTERDAY]: "Ieri",
      [TimeRange.LAST7DAYS]: "Ultimele 7 zile",
      [TimeRange.LAST30DAYS]: "Ultimele 30 zile",
      "THISMONTH": "Luna curentă",
      "LASTMONTH": "Luna trecută"
    };
    
    return labels[activeButton] || "Selectează perioada";
  };

  // Reset active button when filters are reset
  useEffect(() => {
    if (!filters.timeRange && (!filters.customStartDate || !filters.customEndDate)) {
      setActiveButton(null);
    }
  }, [filters]);

  return (
    <div className="space-y-4">
      {/* Presets grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Today */}
        <Button
          variant={activeButton === TimeRange.TODAY ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const today = new Date();
            handlePresetChange(TimeRange.TODAY, today, today);
          }}
        >
          Astăzi
        </Button>

        {/* Yesterday */}
        <Button
          variant={activeButton === TimeRange.YESTERDAY ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const yesterday = subDays(new Date(), 1);
            handlePresetChange(TimeRange.YESTERDAY, yesterday, yesterday);
          }}
        >
          Ieri
        </Button>

        {/* Last 7 days */}
        <Button
          variant={activeButton === TimeRange.LAST7DAYS ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const today = new Date();
            const sevenDaysAgo = subDays(today, 6);
            handlePresetChange(TimeRange.LAST7DAYS, sevenDaysAgo, today);
          }}
        >
          Ultimele 7 zile
        </Button>

        {/* Last 30 days */}
        <Button
          variant={activeButton === TimeRange.LAST30DAYS ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const today = new Date();
            const thirtyDaysAgo = subDays(today, 29);
            handlePresetChange(TimeRange.LAST30DAYS, thirtyDaysAgo, today);
          }}
        >
          Ultimele 30 zile
        </Button>

        {/* This Month */}
        <Button
          variant={activeButton === "THISMONTH" ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const today = new Date();
            const firstDayOfMonth = startOfMonth(today);
            handlePresetChange("THISMONTH", firstDayOfMonth, today);
          }}
        >
          Luna curentă
        </Button>

        {/* Last Month */}
        <Button
          variant={activeButton === "LASTMONTH" ? "default" : "outline"}
          size="sm"
          className="w-full justify-center text-sm"
          onClick={() => {
            const today = new Date();
            const lastMonth = subMonths(today, 1);
            const firstDayOfLastMonth = startOfMonth(lastMonth);
            const lastDayOfLastMonth = endOfMonth(lastMonth);
            handlePresetChange("LASTMONTH", firstDayOfLastMonth, lastDayOfLastMonth);
          }}
        >
          Luna trecută
        </Button>
      </div>

      {/* Custom date picker */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>Interval personalizat</span>
        </div>

        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                fromDate && toDate && "text-gray-900"
              )}
            >
              <CalendarRange className="mr-2 h-4 w-4" />
              {getDisplayText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              defaultMonth={fromDate || new Date()}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              disabled={(date) => date > new Date()}
              locale={ro}
            />

            <div className="flex items-center justify-between p-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const lastWeek = subDays(today, 6);
                    handleDateRangeChange({
                      from: lastWeek,
                      to: today,
                    });
                  }}
                >
                  Ultima săptămână
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const lastMonth = subDays(today, 29);
                    handleDateRangeChange({
                      from: lastMonth,
                      to: today,
                    });
                  }}
                >
                  Ultima lună
                </Button>
              </div>

              <Button size="sm" onClick={() => setCalendarOpen(false)}>
                Aplică
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Reset button */}
      {(filters.timeRange || (filters.customStartDate && filters.customEndDate)) && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4 flex items-center justify-center gap-1.5"
          onClick={() => {
            resetFilters();
            setActiveButton(null);
          }}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Resetează filtrele</span>
        </Button>
      )}
    </div>
  );
};