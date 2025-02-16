import { create } from "zustand";

export interface CompanyFilters {
  cod_CAEN?: string;
  judet?: string;
  oras?: string;
  hasWebsite?: string;
  hasContact?: string;
  sortBy?: string;
}

interface FiltersState {
  filters: CompanyFilters;
  setFilter: <K extends keyof CompanyFilters>(key: K, value: CompanyFilters[K]) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: CompanyFilters = {
  sortBy: "registration_date_desc",
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: DEFAULT_FILTERS,
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
