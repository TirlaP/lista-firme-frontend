// src/hooks/useCompanyDetails.ts
import { companiesService } from "@/services/companies.service";
import { Company } from "@/types/company.types";
import { useQuery } from "@tanstack/react-query";

export const useCompanyDetails = (cui: string) => {
	return useQuery<Company>({
		queryKey: ["company", cui],
		queryFn: () => companiesService.getCompanyByCui(parseInt(cui)),
		enabled: !!cui,
	});
};
