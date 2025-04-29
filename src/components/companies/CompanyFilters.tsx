import { filtersAtom, resetFiltersAtom, setFilterAtom } from "@/atoms/filters";
import { CAENMultiSelect } from "@/components/companies/CAENMultiSelect";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Changed to use shadcn/ui checkbox
import { ComboBox } from "@/components/ui/comboBox";
import { useCompanyStatsByStatus } from "@/hooks/useCompanyStatsByStatus";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { Slider } from "@/components/ui/slider"; // Changed to use shadcn/ui slider
import { useAtomValue, useSetAtom } from "jotai";
import {
  CreditCard,
  FileText,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  RefreshCw,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export const CompanyFilters = () => {
  const filters = useAtomValue(filtersAtom);
  const setFilter = useSetAtom(setFilterAtom);
  const resetFilters = useSetAtom(resetFiltersAtom);

  const { stats: statusStats, isLoading: isLoadingStatusStats } =
    useCompanyStatsByStatus();

  // Set all sections expanded by default
  const [expandedSections, setExpandedSections] = useState({
    stare: true,
    caen: true,
    location: true,
    financial: true,
    contact: true,
  });

  // Location search hook
  const {
    counties,
    cities,
    searchCounty,
    searchCity,
    isLoadingCounties,
    isLoadingCities,
  } = useLocationSearch(filters.judet);

  // Toggles section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Financial filters state
  const [cifraRange, setCifraRange] = useState([0, 9000000000]);
  const [profitRange, setProfitRange] = useState([-1000000000, 1000000000]);
  const [angajatiRange, setAngajatiRange] = useState([0, 100000]);
  const [anInfiintareRange, setAnInfiintareRange] = useState([1980, 2025]);

  useEffect(() => {
    if (
      filters.cifraAfaceriMin !== undefined ||
      filters.cifraAfaceriMax !== undefined
    ) {
      setCifraRange([
        filters.cifraAfaceriMin || 0,
        filters.cifraAfaceriMax || 9000000000,
      ]);
    }

    if (filters.profitMin !== undefined || filters.profitMax !== undefined) {
      setProfitRange([
        filters.profitMin || -1000000000,
        filters.profitMax || 1000000000,
      ]);
    }

    if (
      filters.angajatiMin !== undefined ||
      filters.angajatiMax !== undefined
    ) {
      setAngajatiRange([
        filters.angajatiMin || 0,
        filters.angajatiMax || 100000,
      ]);
    }

    if (
      filters.anInfiintareMin !== undefined ||
      filters.anInfiintareMax !== undefined
    ) {
      setAnInfiintareRange([
        filters.anInfiintareMin || 1980,
        filters.anInfiintareMax || 2025,
      ]);
    }
  }, [filters]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("ro-RO").format(num);
  };

  // Apply financial range filters
  const applyRangeFilter = (type, range) => {
    switch (type) {
      case "cifra":
        setFilter({
          key: "cifraAfaceriMin",
          value: range[0] > 0 ? range[0] : undefined,
        });
        setFilter({
          key: "cifraAfaceriMax",
          value: range[1] < 9000000000 ? range[1] : undefined,
        });
        break;
      case "profit":
        setFilter({
          key: "profitMin",
          value: range[0] > -1000000000 ? range[0] : undefined,
        });
        setFilter({
          key: "profitMax",
          value: range[1] < 1000000000 ? range[1] : undefined,
        });
        break;
      case "angajati":
        setFilter({
          key: "angajatiMin",
          value: range[0] > 0 ? range[0] : undefined,
        });
        setFilter({
          key: "angajatiMax",
          value: range[1] < 100000 ? range[1] : undefined,
        });
        break;
      case "anInfiintare":
        setFilter({
          key: "anInfiintareMin",
          value: range[0] > 1980 ? range[0] : undefined,
        });
        setFilter({
          key: "anInfiintareMax",
          value: range[1] < 2025 ? range[1] : undefined,
        });
        break;
    }
  };

  // Update CAEN codes filter - fixed to handle array of strings properly
  const handleCAENChange = (values: string[]) => {
    // Filter out any invalid values
    const validValues = values.filter(Boolean);
    console.log("Setting CAEN codes:", validValues);
    setFilter({
      key: "caen_codes",
      value: validValues.length > 0 ? validValues : undefined,
    });
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key] !== undefined && key !== "sortBy",
  );

  // Get the current CAEN codes (support both legacy single value and new multi values)
  const getSelectedCAENCodes = (): string[] => {
    // First check for multi-select array
    if (filters.caen_codes && Array.isArray(filters.caen_codes)) {
      return filters.caen_codes;
    }

    // Then check for legacy single value
    if (filters.cod_CAEN) {
      return [filters.cod_CAEN];
    }

    return [];
  };

  return (
    <div className="h-full overflow-y-auto pt-2">
      {/* Company status section */}
      <div className="border-b border-gray-100 pb-3">
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("stare")}
        >
          <h3 className="text-sm font-medium text-gray-700">Stare firmă</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {expandedSections.stare ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.stare && (
          <div className="px-4 py-2 space-y-2">
            {isLoadingStatusStats ? (
              <div className="py-4 flex flex-col items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                <p className="text-xs text-gray-500 mt-2">
                  Se încarcă datele...
                </p>
              </div>
            ) : statusStats?.length > 0 ? (
              statusStats.map((stat) => (
                <div
                  key={stat.stare}
                  className="flex items-center justify-between text-sm"
                >
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.stare === stat.stare}
                      onCheckedChange={(checked) =>
                        setFilter({
                          key: "stare",
                          value: checked ? stat.stare : undefined,
                        })
                      }
                      id={`filter-stare-${stat.stare}`}
                    />
                    <span>{stat.label}</span>
                  </label>
                  <Badge variant="outline" className="bg-gray-50">
                    {formatNumber(stat.count)}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="py-2 text-center">
                <p className="text-sm text-gray-500">
                  Nu există date disponibile.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact information section */}
      <div className="border-b border-gray-100 pb-3">
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("contact")}
        >
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>Informații contact</span>
          </h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {expandedSections.contact ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.contact && (
          <div className="px-4 py-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.hasPhone === "true"}
                  onCheckedChange={(checked) =>
                    setFilter({
                      key: "hasPhone",
                      value: checked ? "true" : undefined,
                    })
                  }
                  id="filter-hasPhone"
                />
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                  <span>Firme cu număr de telefon</span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.hasEmail === "true"}
                  onCheckedChange={(checked) =>
                    setFilter({
                      key: "hasEmail",
                      value: checked ? "true" : undefined,
                    })
                  }
                  id="filter-hasEmail"
                />
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-gray-500" />
                  <span>Firme cu adresă de email</span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.hasWebsite === "true"}
                  onCheckedChange={(checked) =>
                    setFilter({
                      key: "hasWebsite",
                      value: checked ? "true" : undefined,
                    })
                  }
                  id="filter-hasWebsite"
                />
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-gray-500" />
                  <span>Firme cu website</span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.hasAdmin === "true"}
                  onCheckedChange={(checked) =>
                    setFilter({
                      key: "hasAdmin",
                      value: checked ? "true" : undefined,
                    })
                  }
                  id="filter-hasAdmin"
                />
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-gray-500" />
                  <span>Firme cu administrator</span>
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* CAEN code section */}
      <div className="border-b border-gray-100 pb-3">
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("caen")}
        >
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>Include CAEN</span>
          </h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {expandedSections.caen ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.caen && (
          <div className="px-4 py-2">
            <CAENMultiSelect
              values={getSelectedCAENCodes()}
              onChange={handleCAENChange}
            />
          </div>
        )}
      </div>

      {/* Location section */}
      <div className="border-b border-gray-100 pb-3">
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("location")}
        >
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Județ</span>
          </h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {expandedSections.location ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.location && (
          <div className="px-4 py-2 space-y-3">
            <ComboBox
              placeholder="Selectează județ..."
              options={counties || []}
              value={filters.judet}
              onChange={(value) => {
                setFilter({ key: "judet", value });
                setFilter({ key: "oras", value: undefined }); // Reset city when county changes
              }}
              onSearch={searchCounty}
              loading={isLoadingCounties}
            />

            <div className="pt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Localitate</span>
              </h4>
              <ComboBox
                placeholder={
                  filters.judet
                    ? "Selectează localitate..."
                    : "Selectează mai întâi județul"
                }
                options={cities || []}
                value={filters.oras}
                onChange={(value) => setFilter({ key: "oras", value })}
                onSearch={searchCity}
                loading={isLoadingCities}
                disabled={!filters.judet}
              />
            </div>
          </div>
        )}
      </div>

      {/* Financial data section */}
      <div className="border-b border-gray-100 pb-3">
        <div
          className="px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("financial")}
        >
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span>An Date Financiare</span>
          </h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
            {expandedSections.financial ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expandedSections.financial && (
          <div className="px-4 py-2 space-y-4">
            {/* Cifra de afaceri range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Cifra de afaceri
              </label>
              <div className="px-1 pt-4 pb-2">
                <Slider
                  defaultValue={cifraRange}
                  min={0}
                  max={9000000000}
                  step={1000000}
                  onValueChange={setCifraRange}
                  onValueCommit={(value) => applyRangeFilter("cifra", value)}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {formatNumber(cifraRange[0])} RON
                </span>
                <span className="text-xs text-gray-500">
                  {formatNumber(cifraRange[1])} RON
                </span>
              </div>
            </div>

            {/* Profit range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Profit
              </label>
              <div className="px-1 pt-4 pb-2">
                <Slider
                  defaultValue={profitRange}
                  min={-1000000000}
                  max={1000000000}
                  step={1000000}
                  onValueChange={setProfitRange}
                  onValueCommit={(value) => applyRangeFilter("profit", value)}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {formatNumber(profitRange[0])} RON
                </span>
                <span className="text-xs text-gray-500">
                  {formatNumber(profitRange[1])} RON
                </span>
              </div>
            </div>

            {/* Nr. Angajati range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Nr. Angajați
              </label>
              <div className="px-1 pt-4 pb-2">
                <Slider
                  defaultValue={angajatiRange}
                  min={0}
                  max={100000}
                  step={10}
                  onValueChange={setAngajatiRange}
                  onValueCommit={(value) => applyRangeFilter("angajati", value)}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {formatNumber(angajatiRange[0])}
                </span>
                <span className="text-xs text-gray-500">
                  {formatNumber(angajatiRange[1])}
                </span>
              </div>
            </div>

            {/* An infiintare range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Anul înființării
              </label>
              <div className="px-1 pt-4 pb-2">
                <Slider
                  defaultValue={anInfiintareRange}
                  min={1980}
                  max={2025}
                  step={1}
                  onValueChange={setAnInfiintareRange}
                  onValueCommit={(value) =>
                    applyRangeFilter("anInfiintare", value)
                  }
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  {anInfiintareRange[0]}
                </span>
                <span className="text-xs text-gray-500">
                  {anInfiintareRange[1]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset filters button */}
      {hasActiveFilters && (
        <div className="px-4 py-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-1.5 text-sm"
            onClick={resetFilters}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Resetează filtrele</span>
          </Button>
        </div>
      )}
    </div>
  );
};