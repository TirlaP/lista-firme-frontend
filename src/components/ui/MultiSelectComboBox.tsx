import { Badge } from "@/components/ui/Badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import * as React from "react";

export interface ComboBoxOption {
  value: string;
  label: string;
  details?: {
    division?: string;
    section?: string;
    [key: string]: string | undefined;
  };
}

interface MultiSelectComboBoxProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: ComboBoxOption[];
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  displayDetails?: boolean;
  className?: string;
  maxWidth?: string;
}

export const MultiSelectComboBox = ({
  values = [],
  onChange,
  options = [],
  onSearch,
  onFocus,
  placeholder = "Selectează...",
  disabled = false,
  loading = false,
  error,
  displayDetails = false,
  className,
  maxWidth = "600px",
}: MultiSelectComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // Find the selected options
  const selectedOptions = options.filter(
    (option) =>
      values &&
      Array.isArray(values) &&
      option.value &&
      values.includes(option.value),
  );

  // Handle input change directly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onSearch) {
      onSearch(newValue);
    }
  };

  // Handle option selection
  const handleOptionToggle = (optionValue: string) => {
    if (!optionValue) return;

    let newValues: string[];

    if (values.includes(optionValue)) {
      // Remove if already selected
      newValues = values.filter((v) => v !== optionValue);
    } else {
      // Add if not selected
      newValues = [...values, optionValue];
    }
    onChange(newValues);
  };

  // Remove a specific selected value
  const handleRemoveValue = (optionValue: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newValues = values.filter((v) => v !== optionValue);
    onChange(newValues);
  };

  // When the popover opens, initialize the search
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    if (newOpen) {
      // Reset input value when opening
      setInputValue("");

      // Focus the input when opened
      setTimeout(() => {
        const input = document.getElementById("multi-combobox-input");
        if (input) {
          input.focus();
        }
      }, 50);

      if (onFocus) {
        onFocus();
      }
    }
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full flex items-center justify-between font-normal bg-white border border-gray-200 text-left",
                disabled && "opacity-50 cursor-not-allowed",
                className,
              )}
              disabled={disabled}
            >
              <div className="flex-1 flex items-center flex-wrap gap-1 py-1">
                {selectedOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-1 max-w-full">
                    {selectedOptions.map((option) => (
                      <Badge
                        key={option.value}
                        variant="outline"
                        className="px-2 py-1 bg-blue-50 flex items-center gap-1 max-w-xs"
                      >
                        <span className="truncate text-xs">{option.label}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-blue-100 rounded-full"
                          onClick={(e) => handleRemoveValue(option.value, e)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 pl-1">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="start"
          sideOffset={4}
          style={{ maxWidth }}
        >
          <div className="flex border-b">
            <input
              id="multi-combobox-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="flex w-full px-3 py-2 text-sm bg-transparent outline-none"
              autoComplete="off"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">Se încarcă...</span>
              </div>
            ) : Array.isArray(options) && options.length > 0 ? (
              <div className="py-1">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex flex-col cursor-pointer px-3 py-2 hover:bg-blue-50",
                      values.includes(option.value) && "bg-blue-100",
                    )}
                    onClick={() => handleOptionToggle(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate max-w-[90%]">
                        {option.label}
                      </span>
                      {values.includes(option.value) && (
                        <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      )}
                    </div>

                    {displayDetails &&
                      option.details &&
                      Object.values(option.details).some(Boolean) && (
                        <div className="ml-6 mt-1 text-xs text-gray-500">
                          {Object.entries(option.details).map(
                            ([key, value]) =>
                              value && (
                                <div key={key} className="truncate max-w-[90%]">
                                  {value}
                                </div>
                              ),
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-gray-500">
                  Nu a fost găsit niciun rezultat.
                </p>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
