import { LatestCompanyFilters } from "@/types/latest-companies.types";
import { TimeRange, CompanySortField, SortDirection } from "@/graphql/types";
import { format, subDays } from "date-fns";
import { atom } from "jotai";

// Default filter with LAST7DAYS and current date range
const defaultFilters: LatestCompanyFilters = {
  timeRange: TimeRange.LAST7DAYS,
  customStartDate: format(subDays(new Date(), 6), "yyyy-MM-dd"),
  customEndDate: format(new Date(), "yyyy-MM-dd"),
  page: 1,
  sortBy: {
    field: CompanySortField.REGISTRATION_DATE,
    direction: SortDirection.DESC,
  }
};

// Store filters
export const latestCompanyFiltersAtom = atom<LatestCompanyFilters>(defaultFilters);

// Simple set filter action
export const setLatestCompanyFilterAtom = atom(
  null,
  (get, set, { key, value }) => {
    const currentFilters = get(latestCompanyFiltersAtom);
    set(latestCompanyFiltersAtom, {
      ...currentFilters,
      [key]: value,
      ...(key !== "page" && { page: 1 }), // Reset page when filter changes
    });
  }
);

// Reset filters action
export const resetLatestCompanyFiltersAtom = atom(null, (get, set) => {
  set(latestCompanyFiltersAtom, defaultFilters);
});