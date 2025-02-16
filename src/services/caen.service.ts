import { CAENInfo } from "@/types/company.types";
import { apiClient } from "@/utils/apiClient";

class CAENService {
	async searchCAENCodes(query: string): Promise<CAENInfo[]> {
		const { data } = await apiClient.get<CAENInfo[]>("/caen/search", {
			params: { q: query },
		});
		return data;
	}

	async getCAENByCode(code: string): Promise<CAENInfo> {
		const { data } = await apiClient.get<CAENInfo>(`/caen/${code}`);
		return data;
	}

	async getAllCAENCodes(): Promise<CAENInfo[]> {
		const { data } = await apiClient.get<CAENInfo[]>("/caen");
		return data;
	}
}

export const caenService = new CAENService();
