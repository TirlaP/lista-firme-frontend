import { AUTOCOMPLETE_QUERY } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export function useAutocomplete() {
  const [text, setText] = useState("");
  const [fetchAutocomplete, { data, loading, error }] = useLazyQuery(
    AUTOCOMPLETE_QUERY,
    { fetchPolicy: "network-only" },
  );

  useEffect(() => {
    if (text.length > 0) {
      fetchAutocomplete({ variables: { text } });
    }
  }, [text, fetchAutocomplete]);

  return {
    text,
    setText,
    results: data?.autocomplete || [],
    loading,
    error,
  };
}
