import { atom, useAtomValue, useSetAtom } from "jotai";

export interface CompanyFilters {
  cod_CAEN?: string;
  caen_codes?: string[];
  judet?: string;
  oras?: string;
  hasWebsite?: string;
  hasEmail?: string;
  hasPhone?: string;
  hasAdmin?: string;
  stare?: string;
  cifraAfaceriMin?: number;
  cifraAfaceriMax?: number;
  profitMin?: number;
  profitMax?: number;
  angajatiMin?: number;
  angajatiMax?: number;
  anInfiintareMin?: number;
  anInfiintareMax?: number;
  sortBy?: string;
}

const DEFAULT_FILTERS: CompanyFilters = {
  sortBy: "registration_date_desc",
};

// State atom
export const filtersAtom = atom<CompanyFilters>(DEFAULT_FILTERS);

// Set filter action
export const setFilterAtom = atom(
  null,
  <K extends keyof CompanyFilters>(
    get,
    set,
    { key, value }: { key: K; value: CompanyFilters[K] },
  ) => {
    const currentFilters = get(filtersAtom);

    // Special handling for caen_codes and cod_CAEN to avoid conflicts
    if (key === "caen_codes" && value && currentFilters.cod_CAEN) {
      // If setting caen_codes, clear cod_CAEN
      set(filtersAtom, {
        ...currentFilters,
        [key]: value,
        cod_CAEN: undefined,
      });
    } else if (key === "cod_CAEN" && value && currentFilters.caen_codes) {
      // If setting cod_CAEN, clear caen_codes
      set(filtersAtom, {
        ...currentFilters,
        [key]: value,
        caen_codes: undefined,
      });
    } else {
      // Normal case, just set the filter value
      set(filtersAtom, {
        ...currentFilters,
        [key]: value,
      });
    }
  },
);

// Reset filters action
export const resetFiltersAtom = atom(null, (get, set) => {
  set(filtersAtom, DEFAULT_FILTERS);
});

// Custom hook for using filters state and actions (for easy migration from Zustand)
export const useFiltersStore = () => {
  return {
    filters: useAtomValue(filtersAtom),
    setFilter: <K extends keyof CompanyFilters>(
      key: K,
      value: CompanyFilters[K],
    ) => {
      const setFilter = useSetAtom(setFilterAtom);
      setFilter({ key, value });
    },
    resetFilters: useSetAtom(resetFiltersAtom),
  };
};
