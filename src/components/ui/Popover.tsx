import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
	trigger,
	content,
	open: controlledOpen,
	onOpenChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	const open = controlledOpen ?? isOpen;
	const setOpen = onOpenChange ?? setIsOpen;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, setOpen]);

	return (
		<div className="relative" ref={popoverRef}>
			<div onClick={() => setOpen(!open)}>{trigger}</div>
			{open && (
				<div className="absolute z-50 mt-2 min-w-[200px] rounded-md border border-gray-200 bg-white shadow-lg">
					{content}
				</div>
			)}
		</div>
	);
};
