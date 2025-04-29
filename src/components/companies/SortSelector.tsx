import { filtersAtom, setFilterAtom } from "@/atoms/filters";
import { useAtomValue, useSetAtom } from "jotai";
import { ComboBox } from "../ui/comboBox";

export interface ComboBoxOption {
  value: string;
  label: string;
  details?: {
    division?: string;
    section?: string;
    [key: string]: string | undefined;
  };
}

export const SortSelector = () => {
  const filters = useAtomValue(filtersAtom);
  const setFilter = useSetAtom(setFilterAtom);

  const sortOptions: ComboBoxOption[] = [
    { value: "registration_date_desc", label: "Newest First" },
    { value: "registration_date_asc", label: "Oldest First" },
  ];

  return (
    <ComboBox
      options={sortOptions}
      value={filters.sortBy}
      onChange={(value) => setFilter({ key: "sortBy", value })}
      placeholder="Sort by registration date..."
    />
  );
};
