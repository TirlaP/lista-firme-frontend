import { latestCompaniesService } from "@/services/latest-companies.service";
import { LatestCompanyStats } from "@/types/latest-companies.types";
import { useQuery } from "@tanstack/react-query";

export const useLatestCompaniesStats = (
	timeRange: string,
	customStartDate?: string,
	customEndDate?: string
) => {
	return useQuery<LatestCompanyStats>({
		queryKey: [
			"latest-companies-stats",
			timeRange,
			customStartDate,
			customEndDate,
		],
		queryFn: () =>
			latestCompaniesService.getLatestStats(
				timeRange,
				customStartDate,
				customEndDate
			),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};
