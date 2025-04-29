import { apiClient } from "@/services/apiClient";
import type { CAENInfo } from "@/types/company.types";

class CAENService {
  // This is the ONLY method that should make an actual API call
  async getAllCAENCodes(): Promise<CAENInfo[]> {
    try {
      console.log("Making API call to fetch ALL CAEN codes");
      const { data } = await apiClient.get<CAENInfo[]>("/caen");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching all CAEN codes:", error);
      return []; // Return empty array on error
    }
  }

  // This is kept for backward compatibility but should not be used
  // in the new implementation
  async searchCAENCodes(query: string): Promise<CAENInfo[]> {
    console.warn(
      "searchCAENCodes is deprecated - use client-side filtering instead",
    );
    try {
      const { data } = await apiClient.get<CAENInfo[]>("/caen/search", {
        params: { q: query },
      });
      return data;
    } catch (error) {
      console.error(`Error in searchCAENCodes(${query}):`, error);
      return [];
    }
  }

  // This is kept for backward compatibility but should not be used
  async getCAENByCode(code: string): Promise<CAENInfo | null> {
    console.warn(
      "getCAENByCode is deprecated - use client-side filtering instead",
    );
    try {
      const { data } = await apiClient.get<CAENInfo>(`/caen/${code}`);
      return data;
    } catch (error) {
      console.error(`Error in getCAENByCode(${code}):`, error);
      return null;
    }
  }
}

export const caenService = new CAENService();
