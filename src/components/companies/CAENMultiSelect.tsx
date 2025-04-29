import { MultiSelectComboBox } from "@/components/ui/MultiSelectComboBox";
import { useCAENSearch } from "@/hooks/useCAENSearch";
import type { CAENInfo } from "@/types/company.types";

interface CAENMultiSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export const CAENMultiSelect = ({
  values,
  onChange,
  className,
}: CAENMultiSelectProps) => {
  const { search, setSearch, suggestions, isLoading } = useCAENSearch();

  // Transform the CAEN suggestions to the format expected by MultiSelectComboBox
  const options = suggestions.map((item: CAENInfo) => ({
    value: item.code,
    label: `${item.code} - ${item.name}`,
    details: {
      section: item.section_name
        ? `${item.section_code} - ${item.section_name}`
        : undefined,
      division: item.division_name
        ? `${item.division_code} - ${item.division_name}`
        : undefined,
    },
  }));

  return (
    <div className="space-y-2">
      <MultiSelectComboBox
        values={values || []}
        onChange={onChange}
        options={options}
        onSearch={setSearch}
        onFocus={() => setSearch("")}
        loading={isLoading}
        placeholder="Caută cod CAEN..."
        displayDetails={true}
        maxWidth="500px"
      />

      <p className="text-xs text-gray-500">
        Caută după cod, nume, secțiune, sau diviziune
      </p>

      {search && suggestions?.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          {suggestions.length} rezultate
        </p>
      )}
    </div>
  );
};
