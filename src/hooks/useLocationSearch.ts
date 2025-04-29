import { locationService } from "@/services/location.service";
import type { LocationOption, LocationResponse } from "@/types/location.types";
import { useQuery } from "@tanstack/react-query";
// src/hooks/useLocationSearch.ts
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export function useLocationSearch(selectedCounty?: string) {
  const [countySearch, setCountySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const debouncedCountySearch = useDebounce(countySearch, 300);
  const debouncedCitySearch = useDebounce(citySearch, 300);

  // Counties query: if no query is provided, searchCounties() returns all active counties.
  const { data: counties = [], isLoading: isLoadingCounties } = useQuery({
    queryKey: ["counties", debouncedCountySearch],
    queryFn: () => locationService.searchCounties(debouncedCountySearch),
    select: (data: LocationResponse[]): LocationOption[] =>
      data.map((county) => ({
        value: county.code,
        label: county.name,
        code: county.code,
      })),
  });

  // Since the county ComboBox sets filters.judet to a county code,
  // we use that value directly.
  const selectedCountyCode = selectedCounty;

  // Cities query: if there is no search term, get all cities by county.
  const { data: cities = [], isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities", selectedCountyCode, debouncedCitySearch],
    queryFn: async () => {
      if (!selectedCountyCode) return [];
      return debouncedCitySearch
        ? locationService.searchCities(debouncedCitySearch, selectedCountyCode)
        : locationService.getCitiesByCounty(selectedCountyCode);
    },
    select: (data: LocationResponse[]): LocationOption[] =>
      data.map((city) => ({
        value: city.code,
        label: city.name,
        code: city.code,
        type: city.type,
      })),
    enabled: !!selectedCountyCode,
  });

  return {
    counties,
    cities,
    searchCounty: setCountySearch,
    searchCity: setCitySearch,
    isLoadingCounties,
    isLoadingCities,
  };
}
