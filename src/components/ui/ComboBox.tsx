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
	onFocus?: () => void; // Add this prop
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
	options,
	onSearch,
	onFocus, // Add this prop
	placeholder = "Select...",
	label,
	className = "",
	disabled = false,
	loading = false,
	error,
	displayDetails = false,
}: ComboBoxProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const filteredOptions =
		options?.filter((option) =>
			option?.label?.toLowerCase().includes(search.toLowerCase())
		) || [];

	const selected = options?.find((option) => option?.value === value);

	const handleFocus = () => {
		if (!disabled) {
			setIsOpen(true);
			onFocus?.(); // Call onFocus if provided
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (onSearch) {
			const timeoutId = setTimeout(() => {
				onSearch(search);
			}, 300);

			return () => clearTimeout(timeoutId);
		}
	}, [search, onSearch]);

	useEffect(() => {
		if (!isOpen) {
			setHighlightedIndex(0);
		}
	}, [isOpen]);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!isOpen) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				setHighlightedIndex((prev) =>
					Math.min(prev + 1, filteredOptions.length - 1)
				);
				break;
			case "ArrowUp":
				event.preventDefault();
				setHighlightedIndex((prev) => Math.max(prev - 1, 0));
				break;
			case "Enter":
				event.preventDefault();
				if (filteredOptions[highlightedIndex]) {
					onChange(filteredOptions[highlightedIndex].value);
					setSearch("");
					setIsOpen(false);
				}
				break;
			case "Escape":
				event.preventDefault();
				setIsOpen(false);
				break;
		}
	};

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
					placeholder={selected?.label || placeholder}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onFocus={handleFocus}
					onKeyDown={handleKeyDown}
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

			{isOpen && (
				<div
					ref={listRef}
					className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
				>
					{loading ? (
						<div className="flex items-center justify-center py-2 text-xs text-gray-500">
							Loading...
						</div>
					) : filteredOptions.length === 0 ? (
						<div className="py-2 text-center text-xs text-gray-500">
							{loading ? "Loading..." : "No options found"}
						</div>
					) : (
						filteredOptions.map((option, index) => (
							<div
								key={option.value}
								className={cn(
									"cursor-pointer px-2 py-1.5",
									"flex items-center space-x-2 text-xs",
									{
										"bg-blue-50": highlightedIndex === index,
										"bg-blue-100": option.value === value,
									}
								)}
								onClick={() => {
									onChange(option.value);
									setSearch("");
									setIsOpen(false);
								}}
								onMouseEnter={() => setHighlightedIndex(index)}
							>
								<Check
									className={cn("h-3 w-3", {
										"opacity-100": option.value === value,
										"opacity-0": option.value !== value,
									})}
								/>
								<div>
									<div className="font-medium">{option.label}</div>
									{displayDetails && option.details && (
										<div className="text-xs text-gray-500">
											{Object.entries(option.details).map(
												([key, value]) => value && <div key={key}>{value}</div>
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

