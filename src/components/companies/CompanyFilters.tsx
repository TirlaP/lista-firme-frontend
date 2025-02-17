import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComboBox } from "@/components/ui/ComboBox";
import { useCAENSearch } from "@/hooks/useCAENSearch";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useFiltersStore } from "@/store/filtersStore";
import { useState } from "react";
import { SortSelector } from "./SortSelector";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useNavigate } from "react-router-dom";

type FilterSection = "basic" | "advanced";

export const CompanyFilters = () => {
  const { filters, setFilter, resetFilters } = useFiltersStore();
  const [activeSection, setActiveSection] = useState<FilterSection>("basic");
  const {
    search: caenSearch,
    setSearch: setCAENSearch,
    suggestions: caenSuggestions = [],
    isLoading: isLoadingCAEN,
  } = useCAENSearch();
  const {
    counties,
    cities,
    searchCounty,
    searchCity,
    isLoadingCounties,
    isLoadingCities,
  } = useLocationSearch(filters.judet);
  const websiteOptions = [
    { value: "", label: "All Companies" },
    { value: "true", label: "Has Website" },
    { value: "false", label: "No Website" },
  ] as const;
  const contactOptions = [
    { value: "", label: "All Companies" },
    { value: "true", label: "Has Contact Info" },
    { value: "false", label: "No Contact Info" },
  ] as const;
  const { text, setText, results, loading } = useAutocomplete();
  const navigate = useNavigate();

  const renderSectionButton = (section: FilterSection, label: string) => (
    <button
      type="button"
      className={`px-3 py-2 text-sm font-medium transition-colors ${
        activeSection === section
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:text-gray-900"
      }`}
      onClick={() => setActiveSection(section)}
    >
      {label}
    </button>
  );

  const renderFilterBadge = (
    key: keyof typeof filters,
    label: string,
    valueTransform?: (value: string) => string
  ) => {
    const value = filters[key];
    if (!value) return null;
    return (
      <Badge variant="secondary" onClose={() => setFilter(key, undefined)} className="text-xs">
        {`${label}: ${valueTransform ? valueTransform(value) : value}`}
      </Badge>
    );
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key] !== undefined && key !== "page" && key !== "limit"
  );

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex space-x-2 border-b border-gray-200 sticky top-0 bg-white z-10">
          {renderSectionButton("basic", "Basic")}
          {renderSectionButton("advanced", "Advanced")}
        </div>
        <div className={activeSection === "basic" ? "space-y-6" : "hidden"}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Search by Name/CUI/Phone/Email/Website
            </label>
            <input
              type="text"
              className="block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Type something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {loading && <div className="text-xs text-gray-500">Searching...</div>}
            {results.length > 0 && (
              <div className="border border-gray-200 rounded-md mt-1 bg-white max-h-64 overflow-y-auto">
                {results.map((item, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      // Navigate to the company page using the company's taxId as <cui>
                      navigate(`/companies/${item.taxId}`);
                    }}
                  >
                    <div className="text-sm font-medium">{item.companyName}</div>
                    <div className="text-xs text-gray-500">
                      {item.taxId} - {item.locality}, {item.county}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <ComboBox
              label="CAEN Code"
              options={caenSuggestions.map((c) => ({
                value: c.code,
                label: `${c.code} - ${c.name}`,
                details: c.details,
              }))}
              value={filters.cod_CAEN}
              onChange={(value) => setFilter("cod_CAEN", value)}
              onSearch={setCAENSearch}
              onFocus={() => setCAENSearch("")}
              loading={isLoadingCAEN}
              placeholder="Search CAEN codes..."
              displayDetails={false}
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Location</h3>
            <div className="grid gap-4">
              <ComboBox
                placeholder="Select county..."
                options={counties}
                value={filters.judet}
                onChange={(value) => setFilter("judet", value)}
                onSearch={searchCounty}
                loading={isLoadingCounties}
              />
              <ComboBox
                placeholder="Select city..."
                options={cities}
                value={filters.oras}
                onChange={(value) => setFilter("oras", value)}
                onSearch={searchCity}
                loading={isLoadingCities}
                disabled={!filters.judet}
              />
            </div>
          </div>
        </div>
        <div className={activeSection === "advanced" ? "space-y-6" : "hidden"}>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Sort Order</h3>
            <SortSelector />
            <h3 className="text-sm font-medium text-gray-700 mt-6">Contact Information</h3>
            <div className="grid gap-4">
              <ComboBox
                options={websiteOptions}
                value={filters.hasWebsite}
                onChange={(value) => setFilter("hasWebsite", value)}
                placeholder="Filter by website..."
              />
              <ComboBox
                options={contactOptions}
                value={filters.hasContact}
                onChange={(value) => setFilter("hasContact", value)}
                placeholder="Filter by contact info..."
              />
            </div>
          </div>
        </div>
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {renderFilterBadge("cod_CAEN", "CAEN")}
              {renderFilterBadge("judet", "County", (val) => {
                const county = counties.find((c) => c.value === val);
                return county ? county.label : val;
              })}
              {renderFilterBadge("oras", "City")}
              {renderFilterBadge("hasWebsite", "Website", (val) =>
                val === "true" ? "Has Website" : "No Website"
              )}
              {renderFilterBadge("hasContact", "Contact", (val) =>
                val === "true" ? "Has Contact" : "No Contact"
              )}
            </div>
          </div>
        )}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full mb-2"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
