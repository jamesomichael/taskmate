import { useState, useRef, useEffect } from 'react';

const Popover = ({ children, trigger, className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef(null);
	const popoverRef = useRef(null);

	const togglePopover = () => setIsOpen((prev) => !prev);

	const handleClickOutside = (e) => {
		if (
			popoverRef.current &&
			!popoverRef.current.contains(e.target) &&
			triggerRef.current &&
			!triggerRef.current.contains(e.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<div className="relative w-full">
			<div
				ref={triggerRef}
				onClick={togglePopover}
				className="cursor-pointer"
			>
				{trigger}
			</div>
			{isOpen && (
				<div
					ref={popoverRef}
					className={`absolute left-0 mt-2 z-10 bg-white shadow-xl rounded p-3 border border-gray-300 ${className}`}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Popover;
