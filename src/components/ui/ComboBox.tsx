import { cn } from "@/utils/cn";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ComboBoxOption {
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
  label?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  displayDetails?: boolean;
}

export const ComboBox = ({
  value,
  onChange,
  options = [],
  onSearch,
  onFocus,
  placeholder = "Select...",
  label,
  className = "",
  disabled = false,
  loading = false,
  error,
  displayDetails = false,
}: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get selected option
  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search term if no external search is provided
  const displayedOptions = onSearch 
    ? options 
    : options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  // Handle option selection
  const handleSelectOption = (option: ComboBoxOption) => {
    onChange(option.value);
    setSearchTerm("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle input focus
  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      onFocus?.();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < displayedOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
        break;

      case "Enter":
        event.preventDefault();
        if (isOpen && displayedOptions[highlightedIndex]) {
          handleSelectOption(displayedOptions[highlightedIndex]);
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setSearchTerm("");
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
          setSearchTerm("");
        }
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset highlight index when options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [displayedOptions.length]);

  return (
    <div className="relative space-y-1" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "w-full rounded-md border bg-white px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              "border-red-300": error,
              "border-gray-200": !error,
              "opacity-50 cursor-not-allowed": disabled,
            },
            className
          )}
          value={searchTerm || selectedOption?.label || ""}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
        />

        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "absolute inset-y-0 right-0 flex items-center pr-2",
            disabled && "cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <ChevronsUpDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center py-2 text-xs text-gray-500">
              Loading...
            </div>
          ) : displayedOptions.length === 0 ? (
            <div className="py-2 text-center text-xs text-gray-500">
              {searchTerm ? "No matches found" : "No options available"}
            </div>
          ) : (
            displayedOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm cursor-pointer",
                  {
                    "bg-blue-50": highlightedIndex === index,
                    "bg-blue-100": option.value === value,
                  }
                )}
              >
                <span className="w-4">
                  {option.value === value && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </span>
                <div className="ml-2">
                  <div className="font-medium">{option.label}</div>
                  {displayDetails && option.details && (
                    <div className="text-xs text-gray-500">
                      {Object.entries(option.details).map(
                        ([key, value]) => value && (
                          <div key={key}>{value}</div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};