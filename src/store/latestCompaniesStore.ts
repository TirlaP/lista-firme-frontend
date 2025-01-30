import { LatestCompanyFilters } from "@/types/latest-companies.types";
import { create } from "zustand";

interface LatestCompaniesState {
	filters: LatestCompanyFilters;
	setFilter: <K extends keyof LatestCompanyFilters>(
		key: K,
		value: LatestCompanyFilters[K]
	) => void;
	resetFilters: () => void;
}

const defaultFilters: LatestCompanyFilters = {
	timeRange: "last7days",
	page: 1,
	limit: 10,
};

export const useLatestCompaniesStore = create<LatestCompaniesState>((set) => ({
	filters: defaultFilters,
	setFilter: (key, value) =>
		set((state) => ({
			filters: {
				...state.filters,
				[key]: value,
				...(key !== "page" && { page: 1 }), // Reset page when other filters change
			},
		})),
	resetFilters: () => set({ filters: defaultFilters }),
}));
