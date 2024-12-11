// src/components/ui/Card.tsx
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
	return (
		<div
			className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const CardHeader = ({
	children,
	className = "",
	...props
}: CardProps) => {
	return (
		<div
			className={`border-b border-gray-200 px-4 py-3 ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export const CardTitle = ({
	children,
	className = "",
	...props
}: CardProps) => {
	return (
		<h3
			className={`text-lg font-semibold text-gray-900 ${className}`}
			{...props}
		>
			{children}
		</h3>
	);
};

export const CardContent = ({
	children,
	className = "",
	...props
}: CardProps) => {
	return (
		<div className={`px-4 py-3 ${className}`} {...props}>
			{children}
		</div>
	);
};
