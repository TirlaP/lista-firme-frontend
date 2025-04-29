// src/types/location.types.ts
export type LocationType = "county" | "city" | "municipality" | "sector";

export interface LocationResponse {
  _id?: string;
  name: string;
  type: LocationType;
  code: string;
  countyCode?: string;
  standardizedNames?: string[];
  aliases?: string[];
  isActive: boolean;
}

export interface LocationOption {
  value: string;
  label: string;
  code: string;
  type?: LocationType;
  countyCode?: string;
}

export type ComboBoxOption = {
  value: string;
  label: string;
  details?: Record<string, string>;
};
