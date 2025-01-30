import { ComboBox } from "@/components/ui/ComboBox";
import { useFiltersStore } from "@/store/filtersStore";

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
	const { filters, setFilter } = useFiltersStore();

	const sortOptions: ComboBoxOption[] = [
		{ value: "registration_date_desc", label: "Newest First" },
		{ value: "registration_date_asc", label: "Oldest First" },
	];

	return (
		<ComboBox
			options={sortOptions}
			value={filters.sortBy}
			onChange={(value) => setFilter("sortBy", value)}
			placeholder="Sort by registration date..."
		/>
	);
};

