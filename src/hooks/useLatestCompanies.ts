import { latestCompaniesService } from "@/services/latest-companies.service";
import { useLatestCompaniesStore } from "@/store/latestCompaniesStore";
import { LatestCompanyResponse } from "@/types/latest-companies.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";

export const useLatestCompanies = () => {
	const filters = useLatestCompaniesStore((state) => state.filters);
	const debouncedFilters = useDebounce(filters, 500);

	return useQuery<LatestCompanyResponse>({
		queryKey: ["latest-companies", debouncedFilters],
		queryFn: () => latestCompaniesService.getLatestCompanies(debouncedFilters),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		retry: 1,
	});
};
