// src/components/companies/CAENSelect.tsx
import { ComboBox } from "@/components/ui/ComboBox";
import { useCAENSearch } from "@/hooks/useCAENSearch";

interface CAENSelectProps {
	value?: string;
	onChange: (value: string) => void;
	className?: string;
}

export const CAENSelect = ({ value, onChange, className }: CAENSelectProps) => {
	const { search, setSearch, suggestions, isLoading } = useCAENSearch();

	const options =
		suggestions?.map((item) => ({
			value: item.code,
			label: `${item.code} - ${item.name}`,
			details: {
				section: `Section ${item.section_code} - ${item.section_name}`,
				division: `Division ${item.division_code} - ${item.division_name}`,
			},
		})) || [];

	return (
		<div className="space-y-2">
			<ComboBox
				value={value}
				onChange={onChange}
				options={options}
				placeholder={isLoading ? "Loading..." : "Search CAEN codes..."}
				className={className}
			/>
			<p className="text-xs text-gray-500">
				Search by code, name, section, or division
			</p>
		</div>
	);
};
