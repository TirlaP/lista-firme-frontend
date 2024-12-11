// src/components/ui/Badge.tsx
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "secondary" | "destructive" | "outline";
	onClose?: () => void;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
	({ className, variant = "default", children, onClose, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
					{
						"bg-primary text-primary-foreground hover:bg-primary/80":
							variant === "default",
						"bg-blue-100 text-blue-800 hover:bg-blue-200":
							variant === "secondary",
						"bg-red-100 text-red-800 hover:bg-red-200":
							variant === "destructive",
						"border-2 bg-background hover:bg-accent": variant === "outline",
					},
					className
				)}
				{...props}
			>
				{children}
				{onClose && (
					<button
						type="button"
						onClick={onClose}
						className="ml-1 rounded-full p-0.5 hover:bg-black/10"
					>
						<X className="h-3 w-3" />
					</button>
				)}
			</div>
		);
	}
);

Badge.displayName = "Badge";
