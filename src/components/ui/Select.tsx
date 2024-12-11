// src/components/ui/Select.tsx
import * as React from "react";

export interface SelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: Array<{ value: string; label: string }>;
	error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, label, options, error, ...props }, ref) => {
		return (
			<div className="space-y-2">
				{label && (
					<label className="text-sm font-medium text-gray-700">{label}</label>
				)}
				<select
					className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					ref={ref}
					{...props}
				>
					<option value="">Select...</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>
		);
	}
);

Select.displayName = "Select";
