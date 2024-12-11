// src/hooks/useCompanies.ts
import { companiesService } from "@/services/companies.service";
import { useFiltersStore } from "@/store/filtersStore";
import { CompanyResponse } from "@/types/company.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export const useCompanies = () => {
	const filters = useFiltersStore((state) => state.filters);
	const debouncedFilters = useDebounce(filters, 500);

	return useQuery<CompanyResponse>({
		queryKey: ["companies", debouncedFilters],
		queryFn: () => companiesService.getCompanies(debouncedFilters),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		retry: 1,
	});
};

