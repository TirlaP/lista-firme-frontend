import { caenService } from "@/services/caen.service";
import { CAENInfo } from "@/types/company.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export const useCAENSearch = () => {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 300);

	const { data: suggestions, isLoading } = useQuery<CAENInfo[]>({
		queryKey: ["caen_codes", debouncedSearch],
		queryFn: async () => {
			if (debouncedSearch.length === 0) {
				// Get all codes when search is empty
				return caenService.getAllCAENCodes();
			}
			// Search when there's a query
			return caenService.searchCAENCodes(debouncedSearch);
		},
		staleTime: 5 * 60 * 1000,
	});

	return {
		search,
		setSearch,
		suggestions,
		isLoading,
	};
};
