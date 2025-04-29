import { caenService } from "@/services/caen.service";
import type { CAENInfo } from "@/types/company.types";
import { atom, useAtomValue, useSetAtom } from "jotai";

// State atoms
export const allCAENCodesAtom = atom<CAENInfo[]>([]);
export const caenLoadingAtom = atom(false);
export const caenInitializedAtom = atom(false);
export const caenErrorAtom = atom<Error | null>(null);

// Initialize CAEN action
export const initializeCAENAtom = atom(null, async (get, set) => {
  // Skip if already initialized or currently loading
  if (get(caenInitializedAtom) || get(caenLoadingAtom)) return;

  try {
    set(caenLoadingAtom, true);

    // Make a single request to fetch ALL CAEN codes
    const codes = await caenService.getAllCAENCodes();

    // Validate the codes - ensure each has a valid code property
    const validCodes = codes.filter((code) => !!code.code);

    set(allCAENCodesAtom, validCodes);
    set(caenInitializedAtom, true);
  } catch (error) {
    console.error("Failed to load CAEN codes:", error);
    set(
      caenErrorAtom,
      error instanceof Error ? error : new Error("Unknown error"),
    );
  } finally {
    set(caenLoadingAtom, false);
  }
});

// Search CAEN function (derived atom)
export const searchCAENAtom = atom((get) => (query: string): CAENInfo[] => {
  if (!query || query.trim() === "") {
    // Get popular CAEN codes if query is empty
    return getPopularCAENAtom.read(get)();
  }

  query = query.toLowerCase().trim();

  // Filter codes locally - using the actual structure of the CAEN objects
  return get(allCAENCodesAtom).filter((code) => {
    if (!code) return false;

    // Safely check each property exists before calling toLowerCase()
    const codeValue = code.code?.toLowerCase() || "";
    const codeName = code.name?.toLowerCase() || "";
    const divisionName = code.division_name?.toLowerCase() || "";
    const sectionName = code.section_name?.toLowerCase() || "";

    return (
      codeValue.includes(query) ||
      codeName.includes(query) ||
      divisionName.includes(query) ||
      sectionName.includes(query)
    );
  });
});

// Get popular CAEN codes (derived atom)
export const getPopularCAENAtom = atom((get) => (): CAENInfo[] => {
  // If we have all codes loaded, return a subset as "popular"
  const allCodes = get(allCAENCodesAtom);
  if (allCodes.length > 0) {
    // Here you could implement logic to return truly popular codes
    // For now, we'll just return the first 20
    return allCodes.slice(0, 20);
  }
  return [];
});

// Custom hook for using CAEN state and actions (for easy migration from Zustand)
export const useCAENStore = () => {
  return {
    allCAENCodes: useAtomValue(allCAENCodesAtom),
    isLoading: useAtomValue(caenLoadingAtom),
    initialized: useAtomValue(caenInitializedAtom),
    error: useAtomValue(caenErrorAtom),
    initialize: useSetAtom(initializeCAENAtom),
    searchCAEN: useAtomValue(searchCAENAtom),
    getPopularCAEN: useAtomValue(getPopularCAENAtom),
  };
};
