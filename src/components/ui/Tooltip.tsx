// src/components/ui/Tooltip.tsx
import {
	FloatingPortal,
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
	useTransitionStyles,
} from "@floating-ui/react";
import * as React from "react";

interface TooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
}

export const Tooltip = ({
	children,
	content,
	side = "top",
	align = "center",
}: TooltipProps) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const arrowRef = React.useRef(null);

	const { x, y, refs, strategy, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: `${side}-${align}` as any,
		middleware: [offset(8), flip(), shift(), arrow({ element: arrowRef })],
		whileElementsMounted: autoUpdate,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, { move: false, delay: { open: 100, close: 150 } }),
		useFocus(context),
		useRole(context, { role: "tooltip" }),
		useDismiss(context),
	]);

	const { isMounted, styles } = useTransitionStyles(context, {
		initial: {
			opacity: 0,
			transform: "scale(0.95)",
		},
		open: {
			opacity: 1,
			transform: "scale(1)",
		},
		close: {
			opacity: 0,
			transform: "scale(0.95)",
		},
	});

	return (
		<>
			<div ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</div>
			{isMounted && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						className="z-50"
						style={{
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
							...styles,
						}}
						{...getFloatingProps()}
					>
						<div className="bg-gray-900 text-white rounded-md shadow-lg p-2 text-sm max-w-sm">
							<div ref={arrowRef} />
							{content}
						</div>
					</div>
				</FloatingPortal>
			)}
		</>
	);
};

