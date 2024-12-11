// src/components/ui/Input.tsx
import * as React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, error, ...props }, ref) => {
		return (
			<div className="space-y-2">
				{label && (
					<label className="text-sm font-medium text-gray-700">{label}</label>
				)}
				<input
					type={type}
					className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					ref={ref}
					{...props}
				/>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";

