import { CompanyFilters } from "@/types/filters.types";
import { create } from "zustand";

interface FiltersState {
	filters: CompanyFilters;
	setFilter: <K extends keyof CompanyFilters>(
		key: K,
		value: CompanyFilters[K] | undefined
	) => void;
	resetFilters: () => void;
}

const DEFAULT_FILTERS: CompanyFilters = {
	page: 1,
	limit: 10,
	sortBy: "registration_date_desc",
};

export const useFiltersStore = create<FiltersState>((set) => ({
	filters: DEFAULT_FILTERS,
	setFilter: (key, value) =>
		set((state) => ({
			filters: {
				...state.filters,
				[key]: value,
				...(key !== "page" && { page: 1 }),
			},
		})),
	resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
