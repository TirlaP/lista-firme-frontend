import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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

interface ComboBoxProps {
  value?: string;
  onChange: (value: string) => void;
  options: ComboBoxOption[];
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  displayDetails?: boolean;
  className?: string;
}

export const ComboBox = ({
  value,
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
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // Find the selected option
  const selectedOption = options.find((option) => option.value === value);

  // Handle input change directly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (onSearch) {
      onSearch(newValue);
    }
  };

  // Handle option selection
  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  // When the popover opens, initialize the search
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    if (newOpen) {
      // Focus the input when opened
      setTimeout(() => {
        const input = document.getElementById("combobox-input");
        if (input) {
          input.focus();
        }
      }, 100);

      if (onFocus) {
        onFocus();
      }
    } else {
      // Clear search when closed
      setInputValue("");
    }
  };

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal bg-white",
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            disabled={disabled}
          >
            {selectedOption ? (
              <span className="truncate">{selectedOption.label}</span>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex border-b">
            <input
              id="combobox-input"
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
                      value === option.value && "bg-blue-100",
                    )}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      {value === option.value && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>

                    {displayDetails &&
                      option.details &&
                      Object.values(option.details).some(Boolean) && (
                        <div className="ml-6 mt-1 text-xs text-gray-500">
                          {Object.entries(option.details).map(
                            ([key, value]) =>
                              value && <div key={key}>{value}</div>,
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
