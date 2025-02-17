// src/components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-blue-600 text-white hover:bg-blue-700",
				destructive: "bg-red-600 text-white hover:bg-red-700",
				outline:
					"border border-gray-200 bg-white hover:bg-gray-100 text-gray-900",
				secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
				ghost: "hover:bg-gray-100 text-gray-900",
				link: "text-blue-600 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, isLoading, children, ...props }, ref) => {
		return (
			<button
				className={buttonVariants({ variant, size, className })}
				ref={ref}
				disabled={isLoading}
				{...props}
			>
				{isLoading ? (
					<>
						<svg
							className="mr-2 h-4 w-4 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Loading...
					</>
				) : (
					children
				)}
			</button>
		);
	}
);

Button.displayName = "Button";

