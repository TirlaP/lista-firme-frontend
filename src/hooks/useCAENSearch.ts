import {
  caenInitializedAtom,
  caenLoadingAtom,
  getPopularCAENAtom,
  initializeCAENAtom,
  searchCAENAtom,
} from "@/atoms/caen";
import type { CAENInfo } from "@/types/company.types";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useCAENSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [suggestions, setSuggestions] = useState<CAENInfo[]>([]);

  // Get state from Jotai atoms
  const isLoading = useAtomValue(caenLoadingAtom);
  const initialized = useAtomValue(caenInitializedAtom);
  const initialize = useSetAtom(initializeCAENAtom);
  const searchCAEN = useAtomValue(searchCAENAtom);
  const getPopularCAEN = useAtomValue(getPopularCAENAtom);

  // Initialize CAEN store on first load (this is idempotent)
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Perform local client-side search whenever debouncedSearch changes
  useEffect(() => {
    if (!initialized) {
      return; // Wait for initialization before searching
    }

    try {
      // Use the local search function from the atoms
      const results = searchCAEN(debouncedSearch);

      // Ensure each result has a valid code property
      const validResults = results.filter((item) => !!item.code);

      setSuggestions(validResults);
    } catch (error) {
      console.error("Error searching CAEN codes:", error);
      setSuggestions([]);
    }
  }, [debouncedSearch, searchCAEN, initialized]);

  // Initially show popular codes
  useEffect(() => {
    if (initialized && !debouncedSearch) {
      try {
        const popularCodes = getPopularCAEN();
        setSuggestions(popularCodes);
      } catch (error) {
        console.error("Error getting popular CAEN codes:", error);
        setSuggestions([]);
      }
    }
  }, [initialized, getPopularCAEN, debouncedSearch]);

  return {
    search,
    setSearch,
    suggestions: suggestions || [],
    isLoading,
  };
};
