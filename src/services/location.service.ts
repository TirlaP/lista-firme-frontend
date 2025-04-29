import { apiClient } from "@/services/apiClient";
// src/services/location.service.ts
import type { LocationResponse } from "@/types/location.types";

class LocationService {
  async getCounties(): Promise<LocationResponse[]> {
    const { data } = await apiClient.get<LocationResponse[]>(
      "/locations/counties",
    );
    return data;
  }

  async searchCounties(query: string): Promise<LocationResponse[]> {
    const { data } = await apiClient.get<LocationResponse[]>(
      "/locations/counties/search",
      {
        params: { query },
      },
    );
    return data;
  }

  async getCitiesByCounty(countyCode: string): Promise<LocationResponse[]> {
    const { data } = await apiClient.get<LocationResponse[]>(
      `/locations/cities/${countyCode}`,
    );
    return data;
  }

  async searchCities(
    query: string,
    countyCode?: string,
  ): Promise<LocationResponse[]> {
    const { data } = await apiClient.get<LocationResponse[]>(
      "/locations/cities/search",
      {
        params: { query, countyCode },
      },
    );
    return data;
  }
}

export const locationService = new LocationService();
