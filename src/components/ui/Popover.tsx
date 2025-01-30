import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";
import { Portal } from "./Portal";

interface PopoverProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	align?: "start" | "center" | "end";
	className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
	trigger,
	content,
	open: controlledOpen,
	onOpenChange,
	align = "center",
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	const open = controlledOpen ?? isOpen;
	const setOpen = onOpenChange ?? setIsOpen;

	const updatePosition = () => {
		if (!triggerRef.current || !contentRef.current) return;

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const contentRect = contentRef.current.getBoundingClientRect();

		let left = 0;
		if (align === "start") {
			left = triggerRect.left;
		} else if (align === "center") {
			left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
		} else {
			left = triggerRect.right - contentRect.width;
		}

		// Adjust if content would overflow viewport
		const rightOverflow = left + contentRect.width - window.innerWidth;
		if (rightOverflow > 0) {
			left = Math.max(0, left - rightOverflow - 8);
		}
		if (left < 0) {
			left = 8;
		}

		let top = triggerRect.bottom + window.scrollY + 4;

		// Check if the content would overflow the bottom of the viewport
		const bottomOverflow =
			top + contentRect.height - (window.innerHeight + window.scrollY);
		if (bottomOverflow > 0) {
			// Position above the trigger if there's not enough space below
			top = Math.max(
				window.scrollY + 8,
				triggerRect.top + window.scrollY - contentRect.height - 4
			);
		}

		contentRef.current.style.position = "absolute";
		contentRef.current.style.left = `${left}px`;
		contentRef.current.style.top = `${top}px`;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				triggerRef.current &&
				!triggerRef.current.contains(event.target as Node) &&
				contentRef.current &&
				!contentRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		const handleScroll = () => {
			if (open) {
				updatePosition();
			}
		};

		const handleResize = () => {
			if (open) {
				updatePosition();
			}
		};

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
			window.addEventListener("scroll", handleScroll, true);
			window.addEventListener("resize", handleResize);

			// Update position after a small delay to ensure content is rendered
			setTimeout(updatePosition, 0);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll, true);
			window.removeEventListener("resize", handleResize);
		};
	}, [open, setOpen]);

	const handleTriggerClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setOpen(!open);
	};

	return (
		<>
			<div
				ref={triggerRef}
				onClick={handleTriggerClick}
				className="inline-block"
			>
				{trigger}
			</div>
			{open && (
				<Portal>
					<div
						ref={contentRef}
						className={cn(
							"fixed z-[9999] rounded-md border border-gray-200 bg-white shadow-lg",
							className
						)}
						onClick={(e) => e.stopPropagation()}
					>
						{content}
					</div>
				</Portal>
			)}
		</>
	);
};
